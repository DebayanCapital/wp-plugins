<?php
/**
 * Casino Free Games List block.
 *
 * @package WPVue/Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * FreeGamesList class.
 */
class FreeGamesList extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'free-games-list';

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
		        'block_id'=> $this->get_schema_string(),
		        'qty' => $this->get_schema_string(),
		        'style' => $this->get_schema_string(),
		        'show_more'=> $this->get_schema_boolean( false ),
		        'btntxt'=> $this->get_schema_string(),
		        'countQty'=> $this->get_schema_string(),
		        'buttonUrl'=> $this->get_schema_string(),
				'imgID'=> $this->get_schema_string(),
				'values' => $this->get_schema_string(),
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
        if(!isset($block['attrs']['countQty']) && empty($block['attrs']['countQty'])){
        	$block['attrs']['countQty'] = '2';
		}
		if(!isset($block['attrs']['style']) && empty($block['attrs']['style'])){
        	$block['attrs']['style'] = 'list-cat';
        }
		$attributes = $block['attrs'];
		$filteredData = array();
		$category_list = array();
		$games = array();

		$qty = $attributes['qty'];
		$image_url = wp_get_attachment_url($attributes['imgID']);

		$filteredData['secTitle'] = $attributes['secTitle'];
		$filteredData['block_id'] = $attributes['block_id'];
		$filteredData['qty'] = $attributes['qty'];
		$filteredData['style'] = $attributes['style'];
		$filteredData['show_more'] = $attributes['show_more'];
		$filteredData['btntxt'] = $attributes['btntxt'];
		$filteredData['load_more_qty'] = $attributes['countQty'];
		$filteredData['image_url'] = $image_url;
		$filteredData['user_defined_cat_values'] = $attributes['values'];
		$game_categories = array();
		$custom_game_categories = array();
		$custom_game_json ="";
		if($attributes['style']=='list-with-defined-category' && !empty($attributes['values'])){
			for($i=0;$i<count($attributes['values']);$i++){
				$custom_game_categories[] = array(
					'term_id' => $attributes['values'][$i]['value'],
					'name' => $attributes['values'][$i]['label']
				);
			}
			$custom_game_json = json_encode($custom_game_categories);
			$game_categories = json_decode($custom_game_json);
		}else{
			$game_categories = get_terms(array(
				'taxonomy' => 'free_game_category',
				'hide_empty' => FALSE,
				'parent' => 0
			));
		}
		$filteredData['game_categories'] = $game_categories;

		//category list
	    // foreach($game_categories as $key => $game_category) {
	    // 	$category_list[$key]['cat_name'] = $game_category->name;
	    // 	$category_list[$key]['cat_id'] = $game_category->term_id;
	    // }
	    // $filteredData['category_list'] = $category_list;

		foreach($game_categories as $key => $game_category) {
			//$category_list[$game_category->term_id]['cat_name'] = $game_category->name;
	        $args = array(
                'post_type' => 'free_games',
                'posts_per_page' => (!empty($qty)) ? $qty : 4,
                'post_status' => 'publish',
                'tax_query' => array(
                    array(
                        'taxonomy' => 'free_game_category',
                        'field' => 'term_id',
                        'terms' => array($game_category->term_id)
                    )
                )
            );
			$game_posts = get_posts( $args );

			$games_array = array();
			if( $game_posts ) {
				foreach( $game_posts as $key => $each_post) {
					$games_array[$key]['title'] = $each_post->post_title;
					$games_array[$key]['post_id'] = $each_post->ID;
					$games_array[$key]['link'] = post_permalink($each_post->ID);
					$games_array[$key]['slug'] = $each_post->post_name;
					$games_array[$key]['type'] = $each_post->post_type;
					$games_array[$key]['image'] = wp_get_attachment_url( get_post_thumbnail_id( $each_post ) , 'full' );
				}
			}
			wp_reset_postdata();

			$category_list[] = array('cat_name'=>$game_category->name,'post_data'=>$games_array);
			
		}
		$filteredData['games_list'] = $category_list;
		return $filteredData;
	}
}
