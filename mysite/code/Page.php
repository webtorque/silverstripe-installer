<?php
class Page extends SiteTree {

	private static $db = array(
	);

	private static $has_one = array(
		'HeroImage' => 'Image'
	);


}
class Page_Controller extends ContentController {

	/**
	 * An array of actions that can be accessed via a request. Each array element should be an action name, and the
	 * permissions or conditions required to allow the user to access it.
	 *
	 * <code>
	 * array (
	 *     'action', // anyone can access this action
	 *     'action' => true, // same as above
	 *     'action' => 'ADMIN', // you must have ADMIN permissions to access this action
	 *     'action' => '->checkAction' // you can only access this action if $this->checkAction() returns true
	 * );
	 * </code>
	 *
	 * @var array
	 */
	private static $allowed_actions = array (
		'ContactForm'
	);

	public function init() {
		parent::init();

		$themeDir = $this->ThemeDir();

		$this->includeCSS();
		$this->includeJS($themeDir);

		Requirements::set_combined_files_folder($themeDir . '/combined');
	}

	public function includeCSS() {
		if (Director::isDev()) {
			Requirements::themedCSS('normalize');
			Requirements::themedCSS('layout');
			Requirements::themedCSS('typography');
			Requirements::themedCSS('form');
			Requirements::themedCSS('responsive');
		}
		else {
			Requirements::themedCSS('main');
		}
	}

	public function includeJS($themeDir){
		Requirements::combine_files('scripts.js', array(
			$themeDir . '/javascript/jquery-1.9.1.js',
			THIRDPARTY_DIR . '/jquery-entwine/dist/jquery.entwine-dist.js',
			$themeDir . '/javascript/libs/jquery.easing.min.js',
			$themeDir . '/javascript/libs/modernizr-2.6.2-respond-1.1.0.min.js',
			$themeDir . '/javascript/thirdparty/jquery.cycle2.js',
			$themeDir . '/javascript/main.js',
//			'assets/tracking.js'
		));

	}


	/*******************************************************
	 * Ajax request handling
	 *******************************************************/

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

		if (isset($_GET['print'])) {
			//no js
			Requirements::clear();
			//get the Layout template
			$viewer = $this->getViewer($action);
			$templates = $viewer->templates();
			$filename = basename($templates['Layout']);
			$layout = substr($filename, 0, strpos($filename, '.'));

			return $customise ? $this->customise($customise)->renderWith(array('Print', $layout)) : $this->renderWith(array('Print', $layout));
		}

		return $customise ? $this->customise($customise) : array();
	}

	/**
	 * Handles returning the template for an ajax response
	 *
	 * @param string $action  The action to respond to
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
			'PageColour' => $this->PageColour
		));

	}

	public static function do_redirect($url, $code = 302) {
		return Director::is_ajax()
			? singleton('Page_Controller')->jsonResponse(array(
				'Redirect' => $url
			))
			: Controller::curr()->redirect($url, $code);
	}

	public static function get_back_url() {
		$url = null;

		// In edge-cases, this will be called outside of a handleRequest() context; in that case,
		// redirect to the homepage - don't break into the global state at this stage because we'll
		// be calling from a test context or something else where the global state is inappropraite
		if($request = Controller::curr()->getRequest()) {
			if($request->getHeader('X-Referer')) {
				$url = $request->getHeader('X-Referer');
			} else if($request->requestVar('BackURL')) {
				$url = $request->requestVar('BackURL');
			} else if($request->getHeader('Referer')) {
				$url = $request->getHeader('Referer');
			}
		}

		if(!$url) $url = Director::baseURL();

		return $url;
	}

	public function redirect($url, $code = 302) {
		return $this->request->isAjax()
			? $this->jsonResponse(array(
				'Redirect' => $url
			))
			: parent::redirect($url, $code);
	}

	public function redirectBack() {

		return $this->request->isAjax()
			? $this->jsonResponse(array(
				'Redirect' => self::get_back_url()
			))
			: parent::redirectBack();

	}


	protected function handleAction($request, $action) {

		if ($request->isAjax()) {
			$res = array();

			if ($this->hasAction($action)) {
				$res = $this->$action();
			}

			if ($res instanceof SS_HTTPResponse) {
				return $res;
			}

			return $this->actionResponse($action, $res);
		}

		return parent::handleAction($request, $action);

	}
}