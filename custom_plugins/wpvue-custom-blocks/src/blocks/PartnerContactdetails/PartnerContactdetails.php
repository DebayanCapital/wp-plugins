<?php
/**
 * Partner contact details
 *
 * @package WPVue/Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * CasinoImageContent class.
 */
class PartnerContactdetails extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'partner-contact-details';

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
		        'content'=> $this->get_schema_string(),
		        'partner_id'=> $this->get_schema_string(),
		        'block_id'=> $this->get_schema_string(),
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

        if( !empty($partnerId) ){
        	$generated_shortcode = "[cas-product-details pid='$partnerId' review='return']";
			$partnerData = json_decode (do_shortcode($generated_shortcode),true);
        }else{
        	$attributes['partner_data'] = '';
        }
        
        $attributes['block_id'] = $block['attrs']['block_id'];
		$attributes['attrs'] = $block['attrs'];
		$attributes['partner_data'] = $partnerData;
		return $attributes;
	}
}
