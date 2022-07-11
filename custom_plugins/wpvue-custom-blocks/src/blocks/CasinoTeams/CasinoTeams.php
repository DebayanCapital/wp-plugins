<?php
/**
 * Casino Teams block.
 *
 * @package WPVue/Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * CasinoTeams class.
 */
class CasinoTeams extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'casino-teams';

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
		        'section_title'=> $this->get_schema_string(),
		        'block_id' => $this->get_schema_string(),
		        'section_content'=> $this->get_schema_string(),
		        'teams'=> $this->get_schema_string(),
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

	    $team_arr = $attributes['values'];
	    $selected_id = array();
	    if(!empty($team_arr)){
	        foreach ($team_arr as $key => $team_val){
	            $selected_id[$key] = $team_val['value'];
	        }
	    }        
        $args = array('post_type' => 'teams', 'post_status' => 'publish', 'post__in'=>$selected_id, 'orderby'=>'post__in');

		$team_posts = get_posts( $args );

        $team_arr = $atts['values'];
	    $selected_id = array();

	    if(!empty($team_arr)){
	        foreach ($team_arr as $key => $team){
	            $selected_id[$key] = $team['value'];
	        }
	    }
        $filteredData = array();
		$filteredData['sec_title'] = $attributes['section_title'];
		$filteredData['block_id'] = $attributes['block_id'];
		$filteredData['sec_content'] = $attributes['section_content'];
		$team_array = array();
	    if( $team_posts ) {
			foreach( $team_posts as $key => $post ) {
				$team_array[$key]['title'] = $post->post_title;
				$team_array[$key]['content'] = $post->post_content;
				$team_array[$key]['slug'] = $post->post_name;
				$team_array[$key]['type'] = $post->post_type;
				$team_array[$key]['image'] = wp_get_attachment_url( get_post_thumbnail_id( $post ) , 'full' );
				$team_array[$key]['position'] = get_field('member_position', $post->ID );
			}
		}
		$filteredData['team'] = $team_array;
		return $filteredData;
	}
}
