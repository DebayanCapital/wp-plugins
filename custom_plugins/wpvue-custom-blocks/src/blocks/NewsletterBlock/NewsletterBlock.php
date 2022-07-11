<?php
/**
 * Newsletter block.
 *
 * @package WPVue/Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * NewsletterBlock class.
 */
class NewsletterBlock extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'newsletter-block';

	/**
	 * Initiate class.
	 *
	 * @return Block Object
	 */
	public function __construct() {
		//parent::__construct();
	}

	/** 
	 * Get block attributes.
	 *
	 * @return array 
	 */ 
	protected function get_attributes() {
		return array_merge(
			parent::get_attributes(),
			array(
		        'title'=> $this->get_schema_string(),
		        'block_id'=> $this->get_schema_string(),
		        'eighteen_text'=> $this->get_schema_string(),
		        'confirm_text'=> $this->get_schema_string(),
		        'button_text'=> $this->get_schema_string(),
		        'imgID'=> $this->get_schema_string(),
			)
		);
	}

	/**
	 * Render the block.
	 *
	 * @param array  $attributes Block attributes. Default empty array.
	 * @param string $content    Block content. Default empty string.
	 * @return string Rendered block type output.
	 */
	public function render( $attributes = array(), $content = '' ) {
		return '';
	}

	/**
	 * Render filtered Content for REST.
	 *
	 * @param string $content    Block content. Default empty string.
	 * @param array  $block Block array. Default empty array.
	 * @return array FilteredContent block type output.
	 */
	public function render_filtered_content( $content, $block ) {
		//global $wpdb;
		//$resource_id = 0;
        if( $block['blockName'] !== $this->namespace . '/' . $this->block_name ) return $content;
		$attributes = $block['attrs'];
		$image_url = wp_get_attachment_url($attributes['imgID']);
		$attributes['image_url'] = $image_url;
		$attributes['form_action_url'] = 'https://www.aweber.com/scripts/addlead.pl';
		$attributes['aweber_listname'] =  get_theme_option('aweber_listname') ? get_theme_option('aweber_listname') : 'sample listname';
		$attributes['aweber_redirect'] = get_theme_option('aweber_redirect') ? get_theme_option('aweber_redirect') : site_url();
		wp_reset_postdata();
		return $attributes;
	}
}
