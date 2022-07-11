<?php
/**
 * Casino Toplist
 *
 * @package WPVue/Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * CasinoToplist class.
 */
class CasinoToplist extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'casino-toplist';

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
                'title'    	=> $this->get_schema_string(),
                'heading' => $this->get_schema_string(),
				'subheading' => $this->get_schema_string(),
				'group_id' => $this->get_schema_string(),
				'partner_id' => $this->get_schema_string(),
				'tag' => $this->get_schema_string(),
				'tag_relation' => $this->get_schema_string(),
				'type' => $this->get_schema_string(),
				'bonus_type' => $this->get_schema_string(),
				'style' => $this->get_schema_string(),
				'description' => $this->get_schema_string(),
				'imgID'=> $this->get_schema_string(),
				'sideImgID'=> $this->get_schema_string(),
				'start_at_desktop' => $this->get_schema_string(),
				'qty_desktop' => $this->get_schema_string(),
				'start_at_mobile' => $this->get_schema_string(),
				'qty_mobile' => $this->get_schema_string(),
				'load_more_qty' => $this->get_schema_string(),
				'show_load_more' => $this->get_schema_string(),
				'load_more_text' => $this->get_schema_string(),
				'show_supported_casino' => $this->get_schema_string(),
				'supported_casino' => $this->get_schema_string(),
				'software_id' => $this->get_schema_string(),
				'payment_id' => $this->get_schema_string(),
				'show_terms' => $this->get_schema_string(),
				'term_text' => $this->get_schema_string(),
				'term_separator' => $this->get_schema_string(),
				'check_all_casino' => $this->get_schema_string(),
				'all_casino_url' => $this->get_schema_string(),
				'check_all_casino_text' => $this->get_schema_string(),
				'tag_sticker' => $this->get_schema_string(),
				'show_more_desktop' => $this->get_schema_boolean(false),
				'show_more_mobile' => $this->get_schema_boolean(true),
				'text_tag' => $this->get_schema_string(),
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
		$block['attrs']['no_bonus_text'] = "No Bonus";
		if(!isset($block['attrs']['group_id']) || empty($block['attrs']['group_id'])){
			$block['attrs']['group_id'] = get_theme_option( 'cas_toplist_group_id' );
		}
		if(!isset($block['attrs']['partner_id']) || empty($block['attrs']['partner_id'])){
			$block['attrs']['partner_id'] = "";
		}
		if(!isset($block['attrs']['tag']) || empty($block['attrs']['tag'])){
			$block['attrs']['tag'] = get_theme_option( 'cas_toplist_tags' );
		}
		if(get_theme_option( 'cas_toplist_no_bonus_text' )){
			$block['attrs']['no_bonus_text'] = get_theme_option( 'cas_toplist_no_bonus_text' );
		}
		if(get_theme_option( 'cas_toplist_default_terms_text' )){
			$block['attrs']['default_terms_text'] = get_theme_option( 'cas_toplist_default_terms_text' );
		}else{
			$block['attrs']['default_terms_text'] = "T&Cs Apply";
		}
		if(!isset($block['attrs']['tag_relation']) || empty($block['attrs']['tag_relation'])){
			$block['attrs']['tag_relation'] = 'OR';
		}
		if(!isset($block['attrs']['style']) || empty($block['attrs']['style'])){
			$block['attrs']['style'] = 'rows';
		}
		if(!isset($block['attrs']['start_at_desktop']) || empty($block['attrs']['start_at_desktop'])){
			$block['attrs']['start_at_desktop'] = '0';
		}
		if(!isset($block['attrs']['start_at_mobile']) || empty($block['attrs']['start_at_mobile'])){
			$block['attrs']['start_at_mobile'] = '0';
		}
		if(!isset($block['attrs']['qty_desktop']) || empty($block['attrs']['qty_desktop'])){
			$block['attrs']['qty_desktop'] = '6';
		}
		if(!isset($block['attrs']['qty_mobile']) || empty($block['attrs']['qty_mobile'])){
			$block['attrs']['qty_mobile'] = '3';
		}
		if(!isset($block['attrs']['show_load_more']) || empty($block['attrs']['show_load_more'])){
			$block['attrs']['show_load_more'] = 'no';
		}
		if(!isset($block['attrs']['load_more_text']) || empty($block['attrs']['load_more_text'])){
			$block['attrs']['load_more_text'] = 'Load More Casino';
		}
		if(!isset($block['attrs']['show_supported_casino']) || empty($block['attrs']['show_supported_casino'])){
			$block['attrs']['show_supported_casino'] = 'no';
		}
		if(!isset($block['attrs']['show_terms']) || empty($block['attrs']['show_terms'])){
			$block['attrs']['show_terms'] = 'no';
		}
		if(!isset($block['attrs']['term_text']) || empty($block['attrs']['term_text'])){
			$block['attrs']['term_text'] = "Click for full T&C's";
		}
		if(!isset($block['attrs']['term_separator']) || empty($block['attrs']['term_separator'])){
			$block['attrs']['term_separator'] = '•';
		}
		if(!isset($block['attrs']['check_all_casino']) || empty($block['attrs']['check_all_casino'])){
			$block['attrs']['check_all_casino'] = false;
		}
		if(!isset($block['attrs']['check_all_casino_text']) || empty($block['attrs']['check_all_casino_text'])){
			$block['attrs']['check_all_casino_text'] = 'check all casino';
		}
		if(!isset($block['attrs']['pros_cons']) || empty($block['attrs']['pros_cons'])){
			$block['attrs']['pros_cons'] = '2';
		}
		if(isset($block['attrs']['imgID']) || !empty($block['attrs']['imgID'])){
			$block['attrs']['backgroundImageUrl'] = wp_get_attachment_url($block['attrs']['imgID']);
		}
		if(isset($block['attrs']['sideImgID']) || !empty($block['attrs']['sideImgID'])){
			$block['attrs']['sideImageUrl'] = wp_get_attachment_url($block['attrs']['sideImgID']);
		}
		if(!isset($block['attrs']['show_more_desktop'])){
			$block['attrs']['show_more_desktop'] = false;
		}
		if(!isset($block['attrs']['show_more_mobile'])){
			$block['attrs']['show_more_mobile'] = true;
		}
		if(!isset($block['attrs']['enable_free_text_row'])){
			$block['attrs']['enable_free_text_row'] = false;
		}
		if(!isset($block['attrs']['text_tag']) || empty($block['attrs']['text_tag'])){
			$block['attrs']['text_tag'] = 'h1';
		}
		$atts = $block['attrs'];
		if($atts['enable_free_text_row']){
            $free_text_data = $atts['info'];
            $free_text_partner_arr = array_combine(wp_list_pluck($free_text_data, 'partner_id'),wp_list_pluck($free_text_data, 'text'));
        }
		$pros_cons_status = (isset($atts['pros_cons']))?$atts['pros_cons']:'2';
		if (empty($atts['group_id']))
            return;
        /*   Check mobile device or not   */
        if(wp_is_mobile()){
            $qty = $atts['qty_mobile'];
            $start_at = $atts['start_at_mobile'];
        }else{
            $qty = $atts['qty_desktop'];
            $start_at = $atts['start_at_desktop'];
        }
        /*   Supported Attributes pass   */
        if($atts['show_supported_casino']=='yes' && $atts['supported_casino']=='software_provider'){
            $support_atts = 'softwareprovider-id="'.$atts['software_id'].'"' ;
        }elseif ($atts['show_supported_casino']=='yes' && $atts['supported_casino']=='payment_method') {
            $support_atts = 'paymentmethod-id="'.$atts['payment_id'].'"' ;
        }else{
            $support_atts = '';
        }
        /*   Supported Attributes pass   */
        /* Add bonus type */
        if(!empty($atts['bonus_type'])){
            $bonus_atts = 'bonus-type="'.$atts['bonus_type'].'"' ;
        }else{
            $bonus_atts = '';
		}
		/*Check partner id parameter*/
		if(!empty($atts['partner_id'])){
            $partner_atts = 'pid="'.$atts['partner_id'].'"' ;
        }else{
            $partner_atts = '';
        }
        /* check tag parameter has or not */
        if(strlen(trim($atts['tag']))>0){
            $tag = 'tag="'.$atts['tag'].'"' ;
            $tagmode = ($atts['tag_relation']=='OR')?'tagmode="OR"':'';
        }else{
            $tag = '';
            $tagmode = '';
        }
        
        /* check container class */
        if(!is_single()){
            $container = 'container';
        }elseif(is_single() && 'page' == get_post_type()){
            $container = 'container';
        }else{
            $container = '';
        }
        if(($atts['style'] == 'filter') || ($atts['style'] == 'rows-pros-cons') || ($atts['style'] == 'table')){
            $row_flex = '';
        }else{
            $row_flex = 'row-flex row-flex-center';
        }
        $load_more_btn_txt = $atts['load_more_text'];
        $check_all_casino_text = $atts['check_all_casino_text'];
        $generated_shortcode = "[cas-toplist-group id='" . $atts['group_id'] . "' qty='" . $qty . "' start_at='".$start_at."'  style='" . $atts['style'] . "' $partner_atts $bonus_atts  $support_atts  $tag $tagmode return='json']";
        $products = json_decode(do_shortcode($generated_shortcode),true);
		$atts['toplistShortcode'] = $generated_shortcode;
		if(!empty($products) && count($products)>0){
			for($i=0;$i<count($products);$i++){
				$id = $products[$i]['product_id'];
				$payment_shortcode = "[cas-payment-options pid='$id' return='json' ]";
				$paymentData = json_decode (do_shortcode($payment_shortcode),true);
				$software_shortcode = "[cas-software-provider pid='$id' return='json']";
				$softwareData = json_decode (do_shortcode($software_shortcode),true);
				$partner = $products[$i]['product_name'];
				$bonus_summary = $products[$i]['bonus_summary'];
				$bonus_currency = $products[$i]['bonus_currency'];
				$bonus_amount = number_format($products[$i]['bonus_amount']);
				if(!empty($products[$i]['bonus_match'])){
					$bonus_match = $products[$i]['bonus_match'] . "%";
				}else{
					$bonus_match = "";
				}
				$bonusType = $products[$i]['bonus_type'];
				$exc_bonus_amount = number_format($products[$i]['exclusive_bonus_amount']);
				$exc_bonus_match = number_format($products[$i]['exclusive_bonus_match']) . "%";
				$bonus_tc = $products[$i]['bonus_tc'];
				$rating = $products[$i]['rating'];
				$review_link = home_url() . $products[$i]['review_link'];
				$goto_link = site_url() . '/' . $products[$i]['go_link'] . '/' . $products[$i]['slug'];
				$term = $products[$i]['terms'];
				$term_link = site_url() . '/' . $products[$i]['term_link'] . '/' . $products[$i]['slug'];
				$liveTermsLink = $term_link; //$products[$i]['term_link'];
				$background_color = $products[$i]['primary_colour'];
				$min_deposit = $products[$i]['minimum_deposit'];
				$asset_cat_name = $products[$i]['asset_category_name'];
				$freespin = $products[$i]['freespin'];
				$freebie_name = $products[$i]['freebie_name'];
				$bonus_name = $products[$i]['bonus_name'];
				//$tag = explode( ' || ', $bonus_name );
				$tags = $products[$i]['tags'];
				$pros_cons = isset($products[$i]['procons'])?$products[$i]['procons']:'';
				$button_text = $products[$i]['cta_button_text'];
				
				$is_featured = false;
				
				if(!empty($products[$i]['tag'][0])){
					$is_featured = true;
				}
				
				$image_small = (!empty($products[$i]['product_assets'][0]['url']))?$products[$i]['product_assets'][0]['url']:'';
				$image = (!empty($products[$i]['product_assets'][1]['url']))?$products[$i]['product_assets'][1]['url']:'';
				$image_big =(!empty( $products[$i]['product_assets'][2]['url']))?$products[$i]['product_assets'][2]['url']:'';
				
				$sign = "";
				
				/*if ($bonus_currency == "EUR") {
					$sign = "€";
				}else if ($bonus_currency == "USD") {
					$sign = "$";
				}else if ($bonus_currency == "GBP") {
					$sign = "£";
				}*/
				$sign = GetCR($products[$i]['bonus_currency']);
				$structuredBonusAmount = FormatCurrency($sign,$bonus_amount);
				$structuredExclusiveBonusAmount = FormatCurrency($sign,$exc_bonus_amount);
				
				$explodedArr = explode(" | ", $bonus_summary);
				
				$bonus_summary = $explodedArr[0];
				
				$rating = round($rating / 2, 1);
				
				$remainder = 5 - $rating;

				/*if ($exc_bonus_amount != "" && $exc_bonus_amount != 0) {
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
				}*/
				
				/************ BONUS TEXT LOGIC START ***********/
				$bonus = '';
				$upto_text="Up To";
				$bonus_text="Bonus";
				if ($exc_bonus_amount != "" && $exc_bonus_amount != 0) {
					$bonusType="Exclusive Bonus";
					$bonus_class='exclusive';
					if (empty($products[$i]['exclusive_bonus_match']))
						$bonus = "". FormatCurrency($sign,$exc_bonus_amount)."&nbsp;".$bonus_text."";
					else
						$bonus = " ".$exc_bonus_match . " " . $upto_text . " " . FormatCurrency($sign,$exc_bonus_amount)." ";
				}
				else if ($bonus_amount != "" && $bonus_amount != 0) {
					$bonusType="Welcome Bonus";
					$bonus_class='';
					if (empty($products[$i]['bonus_match'])){
						if($bonus_currency=='SC')
							$bonus = " ". ucfirst($bonus_text) . "&nbsp;" .FormatCurrency($sign,$bonus_amount) ." ";
						else
							$bonus = " ". FormatCurrency($sign,$bonus_amount) . "&nbsp;" . $bonus_text." ";
					}
					else
						$bonus = " ".$bonus_match . " " . $upto_text . " " . FormatCurrency($sign,$bonus_amount)." ";
				}else{

					if($products[$i]['bonus_type'] !== 'bonus'){
						$bonus_class='high';
						if($bonusType == 'high_roller'){
							$bonusType="High Roller";
						}
						if($bonusType == 'cash_back'){
							$bonusType="Cash Back";
						}
						if($bonusType == 'first_deposit'){
							$bonusType="First Deposit";
						}
						if($bonusType == 'lotto'){
							$bonusType="Lotto";
						}
						if($bonusType == 'no_deposit'){
							$bonusType="No Deposit";
						}
						//Same logic as welcome bonus
						if ($bonus_amount != "" && $bonus_amount != 0){
							if (empty($products[$i]['bonus_match']))
							$bonus = " ". FormatCurrency($sign,$bonus_amount) . "&nbsp;" . $bonus_text." ";
							else
							$bonus = " ".$bonus_match . " " . $upto_text . " " . FormatCurrency($sign,$bonus_amount)." ";
						}
					}
				}

				$short_bonus = $bonus;
				$freebie_currency = "";
				if ($products[$i]['show_freebie_currency']){
					$freebie_currency = $sign;
				}else{
					$freebie_currency = "";
				}
				if ($freespin != '') {
					if($bonus !== ''){
						$bonus .= " + " . $freebie_currency . $freespin . " " . $freebie_name;
					}else{
						$bonus .= $freebie_currency . $freespin . " " . $freebie_name;
					}
				}

				if(empty($short_bonus) && !empty($bonus)){ 
					$short_bonus =  $bonus; 
				}
				else if(empty($short_bonus) && empty($bonus)){
					$short_bonus =$bonus= ''.$freebie_name.'';
				}

				if(!empty($bonusType) && !empty($bonus))
				{
				$myBonus='<span>'.ucfirst($bonusType).' : </span>'.$bonus.'';   
				}else{
					$myBonus='';
				}
				/************ BONUS TEXT LOGIC END ************/
				/************ ACF DETAILS FIELDS WORK ************/
				if ( $reviewPage = get_posts( array( 'name' => trim($products[$i]['review_link'], '/') ,'post_type' => 'casino-review') ) ){
					$reviewPageId = $reviewPage[0]->ID;
				}else{
					$reviewPageId = 0;
				}
				$products[$i]['review_page_id'] = $reviewPageId;
				if(!empty($reviewPageId)){
					$products[$i]['acf_partner_id'] = get_field( "partner_id", $reviewPageId );
					$products[$i]['wagering_requirements'] = get_field( "wagering_requirements", $reviewPageId );
					$products[$i]['deadline'] = (!empty(get_field( "deadline", $reviewPageId )))?get_field( "deadline", $reviewPageId ):"365 Days";
					$products[$i]['vip_service_available'] = get_field( "vip_service_available", $reviewPageId );
					$products[$i]['ecogra_audited'] = get_field( "ecogra_audited", $reviewPageId );
					$products[$i]['reward_scheme'] = get_field( "reward_scheme", $reviewPageId );
					$products[$i]['sticky'] = (!empty(get_field( "sticky", $reviewPageId )))?get_field( "sticky", $reviewPageId ):"No";
					$products[$i]['live_games_details'] = get_field( "live_games_details", $reviewPageId );
				}
				/************ ACF DETAILS FIELDS WORK ************/
				$pros_cons_data = (array) json_decode(do_shortcode("[cas-pro-cons pid='$id' is-featured='$pros_cons_status' review='return']"));
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
				$products[$i]['free_text'] = (isset($free_text_partner_arr[$products[$i]['product_id']]))?$free_text_partner_arr[$products[$i]['product_id']]:'';
				$products[$i]['goto_link'] = $goto_link;
				$products[$i]['filtered_term_link'] = $term_link;
				$products[$i]['liveTermsLink'] = $liveTermsLink;
				$products[$i]['filtered_review_link'] = $review_link;
				$products[$i]['tags'] = $tags;
				$products[$i]['modified_rating'] = $rating;
				$products[$i]['is_featured'] = $is_featured;
				$products[$i]['filtered_bonus_summary'] = $bonus_summary;
				$products[$i]['sign'] = $sign;
				$products[$i]['structuredBonusAmount'] = $structuredBonusAmount;
				$products[$i]['structuredExclusiveBonusAmount'] = $structuredExclusiveBonusAmount;
				$products[$i]['readyMadeBonus'] = $myBonus;
				$products[$i]['prosData'] = $pros;
				$products[$i]['consData'] = $cons;
				$products[$i]['paymentData'] = $paymentData;
				$products[$i]['softwareData'] = $softwareData;
			}
		}
		$toplistData['block_id'] = $atts['block_id'];	
		$toplistData['attributes'] = $atts;
		$toplistData['gamelistData'] = $products;
		return $toplistData;
	}
	function GetCR($CurrencySign){
		$JsonContent = $json_currency_array = '{
			"currency":[
				{"type":"EUR","symbol":"€"}
				,{"type":"GBP","symbol":"£"}
				,{"type":"USD","symbol":"$"}
				,{"type":"BGN","symbol":"лв"}
				,{"type":"CAD","symbol":"CA$"}
				,{"type":"CHF","symbol":"CHF"}
				,{"type":"CZK","symbol":"Kč"}
				,{"type":"DKK","symbol":"kr"}
				,{"type":"HRK","symbol":"kn"}
				,{"type":"HUF","symbol":"ft"}
				,{"type":"NOK","symbol":"kr"}
				,{"type":"PLN","symbol":"zł"}
				,{"type":"RUB","symbol":"₽"}
				,{"type":"RON","symbol":"lei"}
				,{"type":"SEK","symbol":"kr"}
				,{"type":"TRY","symbol":"₺"}
				,{"type":"UAH","symbol":"₴"}
				,{"type":"ILS","symbol":"₪"}
				,{"type":"NGN","symbol":"₦"}
				,{"type":"ZAR","symbol":"R"}
				,{"type":"BRL","symbol":"R$"}
				,{"type":"CAD","symbol":"$"}
				,{"type":"CLP","symbol":"$"}
				,{"type":"COP","symbol":"$"}
				,{"type":"MXN","symbol":"$"}
				,{"type":"PEN","symbol":"S/."}
				,{"type":"AUD","symbol":"$"}
				,{"type":"BDT","symbol":"৳"}
				,{"type":"IDR","symbol":"Rp"}
				,{"type":"INR","symbol":"₹"}
				,{"type":"JPY","symbol":"¥"}
				,{"type":"MYR","symbol":"RM"}
				,{"type":"NZD","symbol":"$"}
			]
		}';
		$jsonArray = json_decode($JsonContent, true);
		$search = $CurrencySign;
		foreach ($jsonArray["currency"] as $singleData) {
			if ($search == $singleData["type"]) {
				return $singleData["symbol"];
			}
		}
	}
	function FormatCurrency($symbol, $price){
		$country = $_COOKIE["wp-country"];
		$content = array (
			"FR",
			"DE",
			"ES",
			"NO",
			"FI",
			"DK",
			"GL",
			"FO",
			"SE",
			"AX",
			"BE",
			"LT",
			"LV",
			"SJ",
			"SX",
			"SS"
		);
		if(in_array($country,$content)){
			return $price . $symbol;
		}else{
			return $symbol . $price;
		}
	}
}
