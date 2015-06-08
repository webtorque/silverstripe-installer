<?php
class Page extends SiteTree {

	private static $db = array(
	);

	private static $has_one = array(
		'HeroImage' => 'Image'
	);
}

class Page_Controller extends ContentController {

	public function init() {
		parent::init();

		$themeDir = $this->ThemeDir();

		$this->includeCSS();
		$this->includeJS($themeDir);

		Requirements::set_combined_files_folder($themeDir . '/combined');
	}

	public function includeCSS() {
		if (Director::isDev()) {
			Requirements::themedCSS('typography');
			Requirements::themedCSS('layout');
                        Requirements::themedCSS('main');
			Requirements::themedCSS('form');
		}
		else {
			Requirements::themedCSS('main');
		}
	}

	public function includeJS($themeDir){
		if (Director::isDev()) {
			Requirements::javascript($themeDir . '/build/libs.js');
			Requirements::javascript($themeDir . '/build/site.js');
		}
		else {
			Requirements::javascript($themeDir . '/build/libs.min.js');
			Requirements::javascript($themeDir . '/build/site.min.js');
		}

	}

	public function index() {
		return $this->actionResponse('index');
	}

	/**
	 * Handles returning a JSON response, makes sure Content-Type header is set
	 *
	 * @param array $array
	 * @return SS_HTTPResponse
	 */
	public function jsonResponse($array) {
		$response = new SS_HTTPResponse(Convert::raw2json($array));
		$response->addHeader('Content-Type', 'application/json');
		return $response;
	}

	/**
	 * Handles responses, if ajax does a json response, for normal request can pass a redirect link,
	 * if no redirect link defaults to redirect back
	 *
	 * @param $message Message to send to the user
	 * @param string $type Type of message, good or bad
	 * @param null $redirect URL to redirect to
	 * @param array $extraFields Extra fields to pass through to json response
	 * @return bool|SS_HTTPResponse|void
	 */
	public function messageResponse($message, $type = 'good', $redirect = null, $extraFields = array()) {
		if ($this->request->isAjax()) {
			$rArray = array(
				'Status' => $type == 'good' ? 1 : 0,
				'Message' => $message
			);
			if ($extraFields) {
				$rArray = array_merge($rArray, $extraFields);
			}

			if ($redirect) {
				$rArray['Redirect'] = $redirect;
			}

			return $this->jsonResponse($rArray);
		}

		if ($redirect) {
			return $this->redirect($redirect);
		}

		return $this->redirectBack();
	}


	/**
	 * Determines whether ajax or not and responds accordingly
	 *
	 * @param string $action
	 * @param null $customise
	 * @return array|SS_HTTPResponse|ViewableData_Customised
	 */
	public function actionResponse($action, $customise = null) {
		if ($this->request->isAjax() || (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest')) {
			return $this->ajaxResponse($action, $customise);
		}

		$viewer = $this->getViewer($action);
		$templates = $viewer->templates();

		$mainFile = basename($templates['main']);
		$main = substr($mainFile, 0, strpos($mainFile, '.'));

		$layoutFile = basename($templates['Layout']);
		$layout = substr($layoutFile, 0, strpos($layoutFile, '.'));

		$templates = array($layout, $main);

		return $customise ? $this->customise($customise)->renderWith($templates) : $this->renderWith($templates);
	}

	/**
	 * Handles returning the template for an ajax response
	 *
	 * @param string $action The action to respond to
	 * @param null $customise
	 * @return SS_HTTPResponse
	 */
	public function ajaxResponse($action, $customise = null) {

		//get templates
		$viewer = $this->getViewer($action);
		$templates = $viewer->templates();

		//make layout file the main for ajax response
		$viewer->setTemplateFile('main', $templates['Layout']);
		$viewer->setTemplateFile('Layout', null);

		return $this->jsonResponse(array(
			'Title' => ($this->MetaTitle ? $this->MetaTitle : $this->Title) . ' &raquo; ' . SiteConfig::current_site_config()->Title,
			'Content' => $viewer->process($customise ? $this->customise($customise) : $this)->getValue(),
			'PageID' => $this->ID,
			'Segment' => $this->URLSegment,
			//'Level' => $this->CurrentLevel()
		));

	}

}