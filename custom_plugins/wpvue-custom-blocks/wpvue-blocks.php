<?php
/**
 * Plugin Name: WPVue Blocks
 * Plugin URI: https://github.com/highlightmedia/wpvue-custom-blocks
 * Description: WPVue blocks for the Gutenberg editor.
 * Version: 1.0.0
 * Author: Tech HLM
 * Text Domain:  wpvcb-blocks
 *
 * @package WPVue\Blocks
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$minimum_wp_version = '5.0';

if ( version_compare( $GLOBALS['wp_version'], $minimum_wp_version, '<' ) ) {
	/**
	 * Outputs for an admin notice about running Blocks on outdated WordPress.
	 *
	 * @since 1.0.0
	 */
	function wpvcb_blocks_admin_unsupported_wp_notice() {
		?>
		<div class="notice notice-error is-dismissible">
			<p><?php esc_html_e( 'WPVue Blocks requires a more recent version of WordPress and has been paused. Please update WordPress.', 'wpvcb-blocks' ); ?></p>
		</div>
		<?php
	}
	add_action( 'admin_notices', 'wpvcb_blocks_admin_unsupported_wp_notice' );
	return;
}

/**
 * Load WPVue Blocks
 *
 */
class WPVue_Blocks {
	/**
	 * The single instance of the class.
	 *
	 * @var object
	 */
	protected static $instance = null;
        
	/**
	 * Constructor
	 *
	 * @return void
	 */
	protected function __construct() {}

	/**
	 * Get class instance.
	 *
	 * @return object Instance.
	 */
	final public static function instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}
		return static::$instance;
	}

	/**
	 * Init the plugin.
	 */
	public function init() {
		if ( ! $this->has_dependencies() ) {
			return;
		}
		$this->define_constants();
		add_action( 'plugins_loaded', array( $this, 'on_plugins_loaded' ) );
	}
        
	/**
	 * Check dependencies exist.
	 *
	 * @return boolean
	 */
	protected function has_dependencies() {
		return function_exists( 'register_block_type' );
	}
        
	/**
	 * Setup plugin once all other plugins are loaded.
	 *
	 * @return void
	 */
	public function on_plugins_loaded() {
		$this->load_plugin_textdomain();
		$this->includes();
                
		add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'register_blocks_assets' ) );
		add_action( 'enqueue_block_assets', array( __CLASS__, 'enqueue_frontend_assets' ) );
		add_filter( 'block_categories', array( __CLASS__, 'register_block_categories' ) );
		add_action( 'init', array( __CLASS__, 'register_blocks' ) );

	}
        
	/**
	 * Register assets block categories.
	 */
	public static function register_block_categories( $categories ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug' => 'CasinoPages',
           			'title' => __('Casino Guide Blocks', 'ctl'),
					'icon'  => 'screenoptions',
				),
			)
		);
	}
        
	/**
	 * Register assets as needed.
	 */
	public static function register_blocks_assets() {
		global $post;
		// Register block styles for both frontend + backend.
		wp_register_style(
				'wpvcb_blocks-style-css', 
				WPVCB_PLUGIN_URL . 'dist/blocks.style.build.css', 
				is_admin() ? array( 'wp-editor' ) : null, 
				filemtime( WPVCB_PLUGIN_PATH . '/dist/blocks.style.build.css' ) 
		);
		
		// Register block editor script for backend.
		wp_register_script(
				'wpvcb_blocks-scripts-js', 
				WPVCB_PLUGIN_URL . 'dist/blocks.build.js',
				array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components', 'wp-core-data', 'wp-api-fetch' ),
				filemtime( WPVCB_PLUGIN_PATH . '/dist/blocks.build.js' ), 
				true 
		);

		// Register block editor styles for backend.
		wp_register_style(
				'wpvcb_blocks-editor-css', 
				WPVCB_PLUGIN_URL . 'dist/blocks.editor.build.css', 
				array( 'wp-edit-blocks' ), 
				filemtime( WPVCB_PLUGIN_PATH . '/dist/blocks.editor.build.css' ) 
		);

		// WP Localized globals
		$params = apply_filters( 'wpvcb_blocks_scripts_data_params',
		array(
			'pluginDirPath' => WPVCB_PLUGIN_PATH,
			'pluginDirUrl'  => WPVCB_PLUGIN_URL,
			'data'			=> array(
				'postID'		=> ( $post && isset( $post->ID ) ) ? $post->ID : false,
				'categories'	=> get_categories(),
				'cas_data'		=> array(
					'default_display' => ( get_theme_option( 'cas_toplist_default_display' ) ) ? get_theme_option( 'cas_toplist_default_display' ) : 3,
					'display_offset' => ( get_theme_option( 'cas_toplist_display_offset' ) ) ? get_theme_option( 'cas_toplist_display_offset' ) : 3,
					'exclusive_casinos' => wpvcb_get_casinolistOptions( 'exclusive_bonus_amount' ),
					'casino_partners' => wpvcb_get_casinolistOptions( '', false ),
				)
			),
		) );
		wp_localize_script( 'wpvcb_blocks-scripts-js', 'wpvcb_blocks_scripts_data_params', $params );
	}

	/**
	 * Enqueue assets for frontend.
	 */
	public static function enqueue_frontend_assets() {
		if ( !wp_script_is( 'wpvcb_blocks-style-css', 'registered' ) ) {
			wp_register_style(
				'wpvcb_blocks-style-css', 
				WPVCB_PLUGIN_URL . 'dist/blocks.style.build.css', 
				is_admin() ? array( 'wp-editor' ) : null,
				filemtime( WPVCB_PLUGIN_PATH . '/dist/blocks.style.build.css' ) 
			);
		}
		wp_enqueue_style( 'wpvcb_blocks-style-css' );
	}
        
	/**
	 * Register blocks, hooking up assets and render functions as needed.
	 */
	public static function register_blocks() {
		$blocks = array(
			'TopBanner',
			'CasinoImageContent',
			'CasinoTestimonial',
			'FreeGamesList',
			'CasinoToplist',
			'PaymentOptions',
			'SoftwareProviders',
			'WrapperBlock',
			'ContactBlock',
			'GoogleMap',
			'CasinoTeams',
			'PageMenu',
			'CustomCkeditor',
			'DetailPageBanner',
			'ContentWithBackground',
			// 'FreeGamesWithContent',
			'SafetyInformation',
			'PartnerContactdetails',
			'NewsletterBlock',
			'JackpotWinner',
			'PopularPaymentCompared',
			'Sitemap',
			'FreeGamesCategory',
			'MapBlock',
			'CustomYoutube',
			'GamesBanner',
			'SlotInformation',
			'CasinoMatch',
			'WindowedBanner',
			'BulletPoints',
			'SchemaBanner',
		);            
		foreach ( $blocks as $class ) {
			require_once 'src/blocks/' . $class . '/' . $class . '.php';
			$instance = new $class();
			$instance->register_block_type();
			// filtered contents
			$block = $instance->get_namespace() . '/' . $instance->get_block_name();
			add_filter( 'wcra_casino_filter_block_content-' . $block, array( $instance, 'render_filtered_content' ), 99, 2 );
		}
	}

	/**
	 * Define Constants.
	 */
	protected function define_constants() {
		if ( ! defined( 'WPVCB_ABSPATH' ) ) define( 'WPVCB_ABSPATH', dirname( __FILE__ ) . '/' );
		if ( ! defined( 'WPVCB_PLUGIN_URL' ) ) define( 'WPVCB_PLUGIN_URL', plugin_dir_url(__FILE__) );
		if ( ! defined( 'WPVCB_PLUGIN_PATH' ) ) define( 'WPVCB_PLUGIN_PATH', untrailingslashit( plugin_dir_path(__FILE__) ) );
		if ( ! defined( 'WPVCB_VERSION' ) ) define( 'WPVCB_VERSION', '0.0.1' );
	}
        
        /**
	 * includes files.
	 */
	protected function includes() {
		include_once WPVCB_ABSPATH . 'src/blocks/AbstractBlock.php';
	}

	/**
	 * Load Localisation files.
	 */
	protected function load_plugin_textdomain() {
		load_plugin_textdomain( 'wpvcb-blocks', false, basename( dirname( __FILE__ ) ) . '/languages' );
	}
}
WPVue_Blocks::instance()->init();

if( function_exists('acf_register_block_type') ) {
  add_action('acf/init', 'repeater_classic_editor_block');
}
function repeater_classic_editor_block() { 
	// Check function exists.
	if( function_exists('acf_register_block_type') ) { 
	    // Register a testimonial block.
	    acf_register_block_type(array(
	        'name'              => 'repeater-classic-editor',
	        'title'             => __('Repeater Classic editor'),
	        'description'       => __('A custom testimonial block.'),
	        'render_callback'   => 'render_filtered_content',
	        'category'          => 'CasinoPages',
	    ));
	    acf_register_block_type(array(
	        'name'              => 'custom-classic-editor',
	        'title'             => __('Custom Classic editor'),
	        'description'       => __('A custom classic editor block.'),
	        'render_callback'   => 'custom_classic_editor_callback',
	        'category'          => 'CasinoPages',
	    ));
	    acf_register_block_type(array(
	        'name'              => 'free-games-card-repeater',
	        'title'             => __('Free Games Card Repeater'),
	        'description'       => __('Free games card repeater block.'),
	        'render_callback'   => 'free_games_repeater_callback',
	        'category'          => 'CasinoPages',
	    ));
	}
} 

//custom classic editor callback
function custom_classic_editor_callback( $block, $content = '',$is_preview = false, $post_id = 0 ){
	$blockContents = $content['attrs']['data'];

	$block_id = (isset($blockContents['block_id']) && !empty($blockContents['block_id']))?$blockContents['block_id']:'';
	$outPut['block_id'] = $block_id;

	$country = (isset($blockContents['select_country']) && !empty($blockContents['select_country']))?$blockContents['select_country']:'all';
	$outPut['country'] = $country;

	$state = (isset($blockContents['enter_state']) && !empty($blockContents['enter_state']))?$blockContents['enter_state']:'';
	$outPut['state'] = $state;


	$ptag = wpautop($blockContents["classic_editor"]);
	$filteredContent = convert_caption(shortcodeReplacement($ptag));
	
	$outPut['content'] = $filteredContent;
	return $outPut;
}
add_filter( 'wcra_casino_filter_block_content-acf/custom-classic-editor', 'custom_classic_editor_callback', 99, 2 );

//free games card repeater callback
function free_games_repeater_callback( $block,$content = '',$is_preview = false, $post_id = 0 ){
	$blockContents = $content['attrs']['data'];

	$filteredData['title'] = $blockContents['title'];
	$filteredData['total_games'] = $blockContents['total_number_of_games'];
	$filteredData['average_rtp'] = $blockContents['average_rtp'];
	$filteredData['partner_id'] = $blockContents['partner_id'];
	$filteredData['content'] = wpautop($blockContents['content']);

	$partner_id = !empty($blockContents['partner_id']) ? $blockContents['partner_id'] : '';
		if(!empty($partner_id)){
			$generated_shortcode = "[cas-software-provider pid='".$partner_id."' return='json']";
			$providers = json_decode(do_shortcode($generated_shortcode),true);
	}

	$filteredData['providers'] = $providers;

	for($i=0;$i<count($blockContents);$i++){

		if (array_key_exists("free_games_card_repeater_".$i."_title",$blockContents)){
			$filteredTitle[] = $blockContents["free_games_card_repeater_".$i."_title"];
		}
		if (array_key_exists("free_games_card_repeater_".$i."_icon",$blockContents)){
			$filteredIcon[] = wp_get_attachment_url($blockContents["free_games_card_repeater_".$i."_icon"]);
		}
		if (array_key_exists("free_games_card_repeater_".$i."_group_id",$blockContents)){
			$filteredGroup[] = $blockContents["free_games_card_repeater_".$i."_group_id"];
		}
		if (array_key_exists("free_games_card_repeater_".$i."_partner_id",$blockContents)){
			$filteredPid[] = $blockContents["free_games_card_repeater_".$i."_partner_id"];
		}
		$partnerData = partnerData($blockContents["free_games_card_repeater_".$i."_group_id"],$blockContents["free_games_card_repeater_".$i."_partner_id"]);
		$filteredBtn[] = (!empty($partnerData['button_text']))?$partnerData['button_text']:"Visit";
		$filteredBtnUrl[] = $partnerData['button_link'];
		if (array_key_exists("free_games_card_repeater_".$i."_target",$blockContents)){
			$filteredTarget[] = $blockContents["free_games_card_repeater_".$i."_target"];
		}
		if (array_key_exists("free_games_card_repeater_".$i."_number_of_games",$blockContents)){
			$filteredNofGames[] = $blockContents["free_games_card_repeater_".$i."_number_of_games"];
		}
		if (array_key_exists("free_games_card_repeater_".$i."_minimal_bet",$blockContents)){
			$filteredMinBet[] = $blockContents["free_games_card_repeater_".$i."_minimal_bet"];
		}
		if (array_key_exists("free_games_card_repeater_".$i."_maximal_bet",$blockContents)){
			$filteredMaxBet[] = $blockContents["free_games_card_repeater_".$i."_maximal_bet"];
		}
		if (array_key_exists("free_games_card_repeater_".$i."_content",$blockContents)){
			$filteredContent[] = $blockContents["free_games_card_repeater_".$i."_content"];
		}
		if (array_key_exists("free_games_card_repeater_".$i."_image_1",$blockContents)){
			$filteredImage1[] = wp_get_attachment_url($blockContents["free_games_card_repeater_".$i."_image_1"]);
		}
		if (array_key_exists("free_games_card_repeater_".$i."_image_1_title",$blockContents)){
			$filteredImage1Title[] = $blockContents["free_games_card_repeater_".$i."_image_1_title"];
		}

		if (array_key_exists("free_games_card_repeater_".$i."_image_2",$blockContents)){
			$filteredImage2[] = wp_get_attachment_url($blockContents["free_games_card_repeater_".$i."_image_2"]);
		}
		if (array_key_exists("free_games_card_repeater_".$i."_image_2_title",$blockContents)){
			$filteredImage2Title[] = $blockContents["free_games_card_repeater_".$i."_image_2_title"];
		}

		if (array_key_exists("free_games_card_repeater_".$i."_image_3",$blockContents)){
			$filteredImage3[] = wp_get_attachment_url($blockContents["free_games_card_repeater_".$i."_image_3"]);
		}
		if (array_key_exists("free_games_card_repeater_".$i."_image_3_title",$blockContents)){
			$filteredImage3Title[] = $blockContents["free_games_card_repeater_".$i."_image_3_title"];
		}

	}
	
	for($i=0;$i<count($filteredContent);$i++){
		$filteredData['game_data'][] = array(
			'title' => $filteredTitle[$i],
			'icon' => $filteredIcon[$i],
			'button_name' => $filteredBtn[$i],
			'button_url' => $filteredBtnUrl[$i],
			'target' => $filteredTarget[$i],
			'no_of_game' => $filteredNofGames[$i],
			'min_bet' => $filteredMinBet[$i],
			'max_bet' => $filteredMaxBet[$i],
			'content' => $filteredContent[$i],
			'image1' => $filteredImage1[$i],
			'title1' => $filteredImage1Title[$i],

			'image2' => $filteredImage2[$i],
			'title2' => $filteredImage2Title[$i],

			'image3' => $filteredImage3[$i],
			'title3' => $filteredImage3Title[$i],
		);
	}
	$filteredData['block_id'] = $blockContents['block_id'];

	return $filteredData;
}
add_filter( 'wcra_casino_filter_block_content-acf/free-games-card-repeater', 'free_games_repeater_callback', 99, 2 );


//repeater classic callback
function render_filtered_content( $block,$content = '',$is_preview = false, $post_id = 0 ){
    // $text = get_field('repeater_block_id');
	// return $text;
	$blockContents = $content['attrs']['data'];
	
	$filteredMenu = array();
	$filteredContent = array();
	$filteredData = array(); 

	$outPut = array();
	$outPut['style'] = $blockContents['style'];
	$outPut['repeater_block_id'] = $blockContents['repeater_block_id'];
	/********** REVIEW PAGE BANNER DATA ************/
	$partnerId = (isset($blockContents['partner_id_block']) && !empty($blockContents['partner_id_block']))?$blockContents['partner_id_block']:'';
	$outPut['partnerId'] = $partnerId;
	if(!empty($partnerId)){
		$payment_shortcode = "[cas-payment-options pid='$partnerId' return='json' ]";
		$paymentData = json_decode (do_shortcode($payment_shortcode),true);
		$software_shortcode = "[cas-software-platform pid='$partnerId' return='json']";
		$softwareData = json_decode (do_shortcode($software_shortcode),true);
		$generated_shortcode = "[cas-product-details pid='$partnerId' review='return']";
		$partnerData = json_decode (do_shortcode($generated_shortcode),true);
		$id = $partnerId;
		$partner = $partnerData['name'];
		$email = $partnerData['email'];
		$url = $partnerData['url'];
		$slug = $partnerData['slug'];
		$online_since = $partnerData['online_since'];
		$country = $partnerData['country'];
		$bonus_name = $partnerData['bonus_name'];
		$bonus_amount = number_format($partnerData['bonus_amount']);
		if(!empty($partnerData['bonus_match'])){
			$bonus_match = $partnerData['bonus_match'] . "%";
		}else{
			$bonus_match = "";
		}
		$exc_bonus_amount = number_format($partnerData['exclusive_bonus_amount']);
		$exc_bonus_match = number_format($partnerData['exclusive_bonus_match']) . "%";
		$bonus_summary = $partnerData['bonus_summary'];
		$bonus_currency = $partnerData['bonus_currency'];
		$bonus_codes = $partnerData['bonus_codes'];
		$min_deposit = $partnerData['minimum_deposit'];
		$bonus_tc = $partnerData['bonus_tc'];
		$bonus_type = $partnerData['bonus_type'];

		$image_small = (!empty($partnerData['product_assets'][0]['url']))?$partnerData['product_assets'][0]['url']:'';
		$image = (!empty($partnerData['product_assets'][1]['url']))?$partnerData['product_assets'][1]['url']:'';
		$image_big =(!empty( $partnerData['product_assets'][2]['url']))?$partnerData['product_assets'][2]['url']:'';

		$rating = $partnerData['rating'];
		$freespin = $partnerData['freespin'];
		$freebie_name = $partnerData['freebie_name'];
		$review_link = home_url() . $partnerData['review_link'];
		$review_overview = $partnerData['review_overview'];
		$goto_link = $partnerData['go_link'];
		$download_link = $partnerData['download_link'];
		$button_text = $partnerData['cta_button_text'];

		$term = $partnerData['terms'];
		$term_link = site_url() . '/' . $partnerData['term_link'] . '/' . $products[$i]['slug'];
		$background_color = $partnerData['primary_colour'];

		$asset_cat_name = $partnerData['asset_category_name'];



		$tag = explode( ' || ', $bonus_name );
		$pros_cons = isset($partnerData['procons'])?$partnerData['procons']:'';


		$is_featured = false;

		if(!empty($partnerData['tag'][0])){
			$is_featured = true;
		}



		$sign = "";

		if ($bonus_currency == "EUR") {
			$sign = "€";
		}else if ($bonus_currency == "USD") {
			$sign = "$";
		}else if ($bonus_currency == "GBP") {
			$sign = "£";
		}

		$explodedArr = explode(" | ", $bonus_summary);

		$bonus_summary = $explodedArr[0];

		$rating = round($rating / 2, 1);

		$remainder = 5 - $rating;
		$bonus = 'N.A';
		if ($exc_bonus_amount != "" && $exc_bonus_amount != 0) {
			if (empty($p['exclusive_bonus_match']))
				$bonus = $sign . "" . $exc_bonus_amount . "&nbsp;bonus";
			else
				$bonus = $exc_bonus_match . " " . __('up to', 'cjp') . " " . $sign . "" . $exc_bonus_amount;
		}
		else if ($bonus_amount != "" && $bonus_amount != 0) {
			if (empty($p['bonus_match']))
				$bonus = $sign . "" . $bonus_amount . "&nbsp;" . __('bonus', 'cjp');
			else
				$bonus = $bonus_match . " " . __('up to', 'cjp') . " " . $sign . "" . $bonus_amount;
		}if ($freespin != '') {
			$bonus .= " + " . $freespin . " " . $freebie_name;
		}
		$pros_cons_data = (array) json_decode(do_shortcode("[cas-pro-cons pid='$id' is-featured='2' review='return']"));
		$pros = array();
		$cons = array();

		if(!empty($pros_cons_data)){

			foreach ($pros_cons_data as $d) {
				if ($d->is_positive == 1) {
					array_push($pros, $d->description);
				} else {
					array_push($cons, $d->description);
				}
			}
		}
		$partnerData['goto_link'] = $goto_link;
		$partnerData['filtered_term_link'] = $term_link;
		$partnerData['filtered_review_link'] = $review_link;
		$partnerData['tags'] = $tag;
		$partnerData['modified_rating'] = $rating;
		$partnerData['is_featured'] = $is_featured;
		$partnerData['filtered_bonus_summary'] = $bonus_summary;
		$partnerData['sign'] = $sign;
		$partnerData['prosData'] = $pros;
		$partnerData['consData'] = $cons;
		$outPut['reviewBannerData'] = $partnerData;
		$outPut['paymentData'] = $paymentData;
		$outPut['softwareData'] = $softwareData;
	}
	/********** REVIEW PAGE BANNER DATA END ************/
	for($i=0;$i<count($blockContents);$i++){
		if (array_key_exists("repeater_classic_editor_".$i."_repeater_label",$blockContents)){
			$filteredMenu[] = $blockContents["repeater_classic_editor_".$i."_repeater_label"];
		}
		if (array_key_exists("repeater_classic_editor_".$i."_repeater_content",$blockContents)){
			$filteredContent[] = shortcodeReplacement($blockContents["repeater_classic_editor_".$i."_repeater_content"]);
		}
	}
	
	for($i=0;$i<count($filteredContent);$i++){
		$filteredData[] = array(
			'menuName' => $filteredMenu[$i],
			'content' => $filteredContent[$i]
		);
	}

	$outPut['repeaterData'] = $filteredData;
	return $outPut;
}
add_filter( 'wcra_casino_filter_block_content-acf/repeater-classic-editor', 'render_filtered_content', 99, 2 );

function shortcodeReplacement($rawData){
	$count_matches = array();
	//$filter_content = $rawData;
	preg_match_all("/\\[(.*?)\\]/", $rawData, $matches); 
	$count_matches = $matches[0];
	if(count($count_matches)>0){
		for($j=0;$j<count($count_matches);$j++){
			$shortCodeData = do_shortcode($count_matches[$j]);
			if(!empty($shortCodeData)){
				$filter_content = str_replace($count_matches[$j], $shortCodeData, $rawData);
			}
		}
	}else{
		$filter_content = $rawData;
	}
	return $filter_content;
}
function convert_caption($content) { 
    return preg_replace(
        '/\[caption([^\]]+)align="([^"]+)"\s+width="(\d+)"\](\s*\<img[^>]+>)\s*(.*?)\s*\[\/caption\]/i', 
        '<div\1style="width: \3px" class="wp-caption \2">\4<span class="little-text">\5</span></div>', 
        $content); 
}
function wpvcb_get_casinolistOptions( $datakeymatch = '', $tag_enable = true ) {
	$group_id = get_theme_option( 'cas_toplist_group_id' );
	if( !$group_id ) return array();
	$tag = 'exclusive';
	if( $tag_enable ) {
		$toplist_data = do_shortcode('[cas-toplist-group id="'.$group_id.'" tag="'.trim($tag).'" procons-visible="1" return="json"]');
	}else{
		$toplist_data = do_shortcode('[cas-toplist-group id="'.$group_id.'" procons-visible="1" return="json"]');
	}
	
	$toplist_data = json_decode(urldecode($toplist_data), true);
	$casino_options = array();
	if( $toplist_data ) {
		foreach ( $toplist_data as $partner ) {
			if( $datakeymatch ) {
				if( isset( $partner[$datakeymatch] ) && $partner[$datakeymatch] ) {
					$casino_options[] = array(
						'value'	=> $partner['product_id'],
						'label' => $partner['product_name']
					);
				}
			}else{
				$casino_options[] = array(
					'value'	=> $partner['product_id'],
					'label' => $partner['product_name']
				);
			}
		}
	}
	return $casino_options;
}
function partnerData($groupId="",$partnerId=""){
	$groupId = (!empty($groupId)) ? $groupId : get_theme_option( 'cas_toplist_group_id' );
	$generated_shortcode = "[cas-toplist-group id='$groupId' pid='$partnerId' return='json']";
	$partnerData = json_decode (do_shortcode($generated_shortcode),true);
	$goto_link = site_url() . '/' . $partnerData[0]['go_link'] . '/' . $partnerData[0]['slug'];
	$button_text = $partnerData[0]['cta_button_text'];
	$data = "";
	$data = array("button_link" => $goto_link, "button_text" => $button_text);
	return $data;
}