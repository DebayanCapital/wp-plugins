<?php
/**
 * Page Menu block.
 *
 * @package WPVue/Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * TopBanner class.
 */
class PageMenu extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'page-menu';

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
				'style'=> $this->get_schema_string(),
				'items'=> $this->get_schema_string(),
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
		global $wpdb;
		$resource_id = 0;
        if( $block['blockName'] !== $this->namespace . '/' . $this->block_name ) return $content;
		if(!isset($block['attrs']['style']) || empty($block['attrs']['style'])){
			$block['attrs']['style'] = 'top-menu';
		}
		$block['attrs']['default_play_button_text'] = (!empty(get_theme_option( 'default_play_button_text' )))?get_theme_option( 'default_play_button_text' ):"Play Now";
		$block['attrs']['uk_play_button_text'] = (!empty(get_theme_option( 'uk_play_button_text' )))?get_theme_option( 'uk_play_button_text' ):"Visit";
		$attributes = $block['attrs'];
		return $attributes;
	}
}
