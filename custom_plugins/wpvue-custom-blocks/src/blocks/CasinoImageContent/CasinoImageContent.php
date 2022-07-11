<?php
/**
 * AlternativePayemtOptions block.
 *
 * @package WPVue/Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * CasinoImageContent class.
 */
class CasinoImageContent extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'casino-image-content';

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
		        'secTitle'=> $this->get_schema_string(),
		        'secTitle'=> $this->get_schema_string(),
		        'partner_id'=> $this->get_schema_string(),
		        'block_id'=> $this->get_schema_string(),
		        'info'=> $this->get_schema_string(),
		        'style'=> $this->get_schema_string(),
		        'bottom_content'=> $this->get_schema_string(),
		        'btn_txt'=> $this->get_schema_string(),
		        'btn_url'=> $this->get_schema_string(),
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
        $partnerId = (isset($block['attrs']['partner_id']) && !empty($block['attrs']['partner_id'])) ? $block['attrs']['partner_id'] : '';
		$block['attrs']['default_play_button_text'] = (!empty(get_theme_option( 'default_play_button_text' )))?get_theme_option( 'default_play_button_text' ):"Play Now";
		$block['attrs']['uk_play_button_text'] = (!empty(get_theme_option( 'uk_play_button_text' )))?get_theme_option( 'uk_play_button_text' ):"Visit";
		$block['attrs']['style'] = (isset($block['attrs']['style']) && !empty($block['attrs']['style'])) ? $block['attrs']['style'] : 'card';
		if(!empty($partnerId)){
        	$generated_shortcode = "[cas-product-details pid='$partnerId' review='return']";
			$partnerData = json_decode (do_shortcode($generated_shortcode),true);
			$attributes['go_link'] = $partnerData['go_link'];
        }else{
        	$attributes['go_link'] = '';
        }
        
        $attributes['block_id'] = $block['attrs']['block_id'];
		$attributes['attrs'] = $block['attrs'];
		return $attributes;
	}
}
