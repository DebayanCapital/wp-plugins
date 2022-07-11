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
class CasinoMatch extends AbstractBlock {

    /**
     * Block name.
     *
     * @var string
     */
    protected $block_name = 'casino-match';

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
                'block_id' => $this->get_schema_string(),
                'title' => $this->get_schema_string(),
                'subTitle' => $this->get_schema_string(),
                'lightbox_title' => $this->get_schema_string(),
                'lightbox_subtitle' => $this->get_schema_string(),
                'content' => $this->get_schema_string(),
                'values' => $this->get_schema_string(),
                'casino_match' => $this->get_schema_string(),
                'buttonText' => $this->get_schema_string(),
                'add_button' => $this->get_schema_string(),
                'buttonText2'=> $this->get_schema_string(),
                'buttonUrl2'=> $this->get_schema_string(),
                'imgID'=> $this->get_schema_string(),
                'resultImgID'=> $this->get_schema_string(),
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
        $filteredData['block_id'] = $attributes['block_id'];
        $filteredData['title'] = $attributes['title'];
        $filteredData['subTitle'] = $attributes['subTitle'];
        $filteredData['lightbox_title'] = $attributes['lightbox_title'];
        $filteredData['lightbox_subtitle'] = $attributes['lightbox_subtitle'];
        $filteredData['content'] = $attributes['content'];
        $filteredData['casino_match_btn_txt'] = $attributes['buttonText'];
        $filteredData['add_button'] = (!isset($block['attrs']['add_button']) || empty($block['attrs']['add_button']))?false:$attributes['add_button'];
        $filteredData['general_btn_txt'] = $attributes['buttonText2'];
        $filteredData['general_btn_url'] = $attributes['buttonUrl2'];
        $filteredData['bg_img'] = wp_get_attachment_url($attributes['imgID']);
        $filteredData['result_section_img'] = wp_get_attachment_url($attributes['resultImgID']);


        $match_cat_id = $attributes['casino_match'][0]['id'];
        $args = [
            'post_type' => 'casino_match',
            'post_status' => 'publish',
            'order' => 'ASC',
            'tax_query' => [
                [
                    'taxonomy' => 'casino_match_category',
                    'terms' => $match_cat_id,
                ],
            ],
        ];
        $casino_type = get_posts( $args );

        $casino_type_array = array();
        if( $casino_type ) {
            foreach( $casino_type as $key => $post ) {
                $casino_type_array[$key]['title'] = $post->post_title;
                $casino_type_array[$key]['link'] = post_permalink($post->ID);
                $casino_type_array[$key]['type'] = $post->post_type;
                $casino_type_array[$key]['image'] = wp_get_attachment_url( get_post_thumbnail_id( $post ) , 'full' );
                $casino_type_array[$key]['option_type'] = get_field('option_type', $post->ID);
                $casino_type_array[$key]['option'] = get_field('option', $post->ID);
            }
        }
        $filteredData['casino_match'] = $casino_type_array;
        return $filteredData;
    }
}
