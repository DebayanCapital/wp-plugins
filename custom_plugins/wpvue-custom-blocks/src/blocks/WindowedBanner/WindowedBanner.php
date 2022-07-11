<?php
/**
 * Windowed Banner block.
 *
 * @package WPVue/Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * Windowed Banner class.
 */
class WindowedBanner extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'windowed-banner';

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
                'banner_heading'    	=> $this->get_schema_string(),
                'banner_sub_heading'=> $this->get_schema_string(),
                'block_id' => $this->get_schema_string(),
				'items'=> $this->get_schema_string(),
				'locations'=> $this->get_schema_string(),
				'post_id'=> $this->get_schema_string(),
				'imgID'=> $this->get_schema_string(),
				'showCounter'=> $this->get_schema_string(),
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
		$attributes = $block['attrs'];
		//$image_url = wp_get_attachment_url($attributes['imgID']);
		//$attributes['image_url'] = $image_url;
		$output['banner_heading']=$attributes['banner_heading'];
		$output['banner_sub_heading']=$attributes['banner_sub_heading'];
		$output['bg_image']=$attributes['imgURL'];

		$items=!empty($attributes['items'])?$attributes['items']:null;
		if(!empty($items)){
			foreach($items as $key=>$item)
			{
				$activation_date=strtotime($item['activationDate']);          
				$expiry_date=strtotime($item['expiryDate']);

				if($activation_date < time())
					$items[$key]['active']=true;
				else
					$items[$key]['active']=false;

				if(!empty($expiry_date) && $expiry_date < time())
					$items[$key]['expired']=true;
				else
					$items[$key]['expired']=false;

				if(isset($item['state']) && !empty($item['state']))
					$items[$key]['state']=$item['state'];
				else
					$items[$key]['state']='rest-of-world';
			}
		}

		$output['items']=$items;
		
		return $output;
	}
}
