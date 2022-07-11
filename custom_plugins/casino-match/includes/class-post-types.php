<?php
if(!function_exists('cm_custom_post_types')){

    function cm_custom_post_types(){

        /*post types - casino match*/
        $labels = array(
            'name'               => _x( 'Casino match', 'Game Lists', 'cm' ),
            'singular_name'      => _x( 'Casino match', 'Game','cm' ),
            'add_new'            => _x( 'Add new match type', 'cm' ),
            'add_new_item'       => __( 'Add new match type', 'cm' ),
            'edit_item'          => __( 'Edit match type', 'cm' ),
            'update_item'        => __( 'Update match type', 'cm'),
            'new_item'           => __( 'New match type', 'cm' ),
            'all_items'          => __( 'All match types', 'cm' ),
            'view_item'          => __( 'View match type', 'cm' ),
            'search_items'       => __( 'Search match type', 'cm' ),
            'not_found'          => __( 'No match type found', 'cm' ),
            'not_found_in_trash' => __( 'No match type found in the Trash', 'cm' ), 
            'parent_item_colon'  => __( 'Match type', 'cm' ),
            'menu_name'          => __('Casino match', 'cm')
        );

        $args = array(
            'labels' => $labels,
            'description' => __('Description', 'cm'),
            'public' => true,
            'publicly_queryable' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'query_var' => true,
            'rewrite' => array('slug' => 'casino_match'),
            'capability_type' => 'post',
            'has_archive' => true,
            'hierarchical' => true,
            'menu_position' => null,
            'show_in_rest'=> true,
            'menu_icon' => 'dashicons-sos',
            'supports' => array('title','thumbnail')
        ); 

        /*register match post*/
        register_post_type( 'casino_match', $args );

        /*match category*/
        $labels = array(
            'name'              => _x( 'Category', 'Casino match', 'cm' ),
            'singular_name'     => _x( 'Category', 'Casino match', 'cm' ),
            'search_items'      => __( 'Search Category', 'cm' ),
            'all_items'         => __( 'All Category', 'cm' ),
            'parent_item'       => __( 'Parent Category', 'cm' ),
            'parent_item_colon' => __( 'Parent Category:', 'cm' ),
            'edit_item'         => __( 'Edit Category', 'cm' ),
            'update_item'       => __( 'Update Category', 'cm' ),
            'add_new_item'      => __( 'Add New Category', 'cm' ),
            'new_item_name'     => __( 'New Category', 'cm' ),
            'menu_name'         => __( 'Category', 'cm' ),
        );
     
        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'show_in_rest'      => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'casino_match' ),
        );
        /*register casino match category*/
        register_taxonomy( 'casino_match_category', array('casino_match'), $args );
    }
    add_action('init', 'cm_custom_post_types');
}