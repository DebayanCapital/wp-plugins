<?php
/**
 * Casino FreeGamesCategory block.
 *
 * @package WPVue/Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * FreeGamesCategory class.
 */
class FreeGamesCategory extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'free-games-category';

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
		        'section_title' => $this->get_schema_string(),
		        'block_id' => $this->get_schema_string(),
		        'section_content'=> $this->get_schema_string(),
		        'free_games'=> $this->get_schema_string(),
		        'values'=> $this->get_schema_string(),
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

	    $free_games_arr = $attributes['values'];
	    $selected_id = array();
	    if(!empty($free_games_arr)){
	        foreach ($free_games_arr as $key => $free_games_val){
	            $selected_id[$key] = $free_games_val['value'];
	        }
	    }        
        $args = array('post_type' => 'free_games', 'posts_per_page' => -1, 'post_status' => 'publish', 'post__in'=>$selected_id, 'orderby'=>'post__in');

		$free_games_posts = get_posts( $args );

        $free_games_arr = $atts['values'];
	    $selected_id = array();

	    if(!empty($free_games_arr)){
	        foreach ($free_games_arr as $key => $free_games){
	            $selected_id[$key] = $free_games['value'];
	        }
	    }
        $filteredData = array();
		$filteredData['sec_title'] = $attributes['section_title'];
		$filteredData['block_id'] = $attributes['block_id'];
		$filteredData['sec_content'] = $attributes['section_content'];
		$free_games_array = array();
	    if( $free_games_posts ) {
			foreach( $free_games_posts as $key => $post ) {
				$free_games_array[$key]['title'] = $post->post_title;
				$free_games_array[$key]['content'] = $post->post_content;
				$free_games_array[$key]['link'] = post_permalink($post->ID);
				$free_games_array[$key]['slug'] = $post->post_name;
				$free_games_array[$key]['type'] = $post->post_type;
				$free_games_array[$key]['image'] = wp_get_attachment_url( get_post_thumbnail_id( $post ) , 'full' );
			}
		}
		$filteredData['free_games'] = $free_games_array;
		return $filteredData;
	}
}
