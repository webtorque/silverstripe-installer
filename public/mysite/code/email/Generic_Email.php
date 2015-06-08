<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Generic_Email
 *
 * @author 7
 */
class Generic_Email extends Email{
        public $ss_template = 'Generic_Email';

        /**
         * Populate template from SiteConfig
         * @param $subjectField
         * @param $messageField
         * @param $replacementFields array Associative array of fields in email and values
         */
        public function populateFromConfig($subjectField, $messageField, $replacementFields) {

                $config = SiteConfig::current_site_config();

                $subject = $config->{$subjectField};
                $message = $config->{$messageField};

                $subject = str_replace(array_keys($replacementFields), array_values($replacementFields), $subject);
                $message = str_replace(array_keys($replacementFields), array_values($replacementFields), $message);

                $this->setSubject($subject);

                $this->populateTemplate(array(
                        'Subject' => $subject,
                        'Content' => $message,
	                'SiteConfig' => SiteConfig::current_site_config()
                ));

                $this->setFrom($config->SiteEmailFrom);

        }


}
