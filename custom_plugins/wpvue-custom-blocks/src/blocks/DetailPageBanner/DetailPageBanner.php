<?php
/**
 * Detail Page Banner block.
 *
 * @package WPVue/Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * DetailPageBanner class.
 */
class DetailPageBanner extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'detail-page-banner';

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
		        'title'=> $this->get_schema_string(),
		        'block_id'=> $this->get_schema_string(),
		        'subtitle'=> $this->get_schema_string(),
		        'partnerId'=> $this->get_schema_string(),
		        'urlType'=> $this->get_schema_string(),
		        'gameUrl'=> $this->get_schema_string(),
		        'videoLink'=> $this->get_schema_string(),
		        'bannerOption'=> $this->get_schema_string(),
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
		if(!isset($block['attrs']['bannerOption']) || empty($block['attrs']['bannerOption']) || $block['attrs']['bannerOption']=='ReviewBanner'){
			$block['attrs']['bannerOption'] = 'ReviewBanner';
		}
		if(!isset($block['attrs']['urlType']) || empty($block['attrs']['urlType']) || $block['attrs']['urlType']=='gameUrl'){
			$block['attrs']['urlType'] = 'gameUrl';
		}
		$block['attrs']['no_bonus_text'] = "No Bonus";
		if(get_theme_option( 'cas_toplist_no_bonus_text' )){
			$block['attrs']['no_bonus_text'] = get_theme_option( 'cas_toplist_no_bonus_text' );
		}
		if(get_theme_option( 'cas_toplist_default_terms_text' )){
			$block['attrs']['default_terms_text'] = get_theme_option( 'cas_toplist_default_terms_text' );
		}else{
			$block['attrs']['default_terms_text'] = "T&Cs Apply";
		}
		$attributes = $block['attrs'];
		$outPut['attributes'] = $attributes;
		if(isset($attributes['partnerId']) && !empty($attributes['partnerId'])){
			$partnerId = $attributes['partnerId'];
			$groupId = (!empty($attributes['group_id'])) ? $attributes['group_id'] : get_theme_option( 'cas_toplist_group_id' );

			$review_shortcode = "[cas-ratings pid='$partnerId' review='return']";
			$rvd = do_shortcode($review_shortcode);
			$reviewData = json_decode (do_shortcode($review_shortcode),true);
			$payment_shortcode = "[cas-payment-options pid='$partnerId' return='json' ]";
			$paymentData = json_decode (do_shortcode($payment_shortcode),true);
			$software_shortcode = "[cas-software-provider pid='$partnerId' return='json']";
			$softwareData = json_decode (do_shortcode($software_shortcode),true);
			$generated_shortcode = "[cas-product-details pid='$partnerId' review='return']";
			$partnerData = json_decode (do_shortcode($generated_shortcode),true);

			$licence_shortcode = "[cas-toplist-group id='$groupId' pid='$partnerId' return='json']";
			$licenceData = json_decode (do_shortcode($licence_shortcode),true);
			// print_r($licenceData);
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
			$bonusType = $partnerData['bonus_type'];
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

			$term = $licenceData[0]['terms'];
			$term_link = "";
			if(isset($licenceData[0]['term_link']) && !empty($licenceData[0]['term_link'])){
				$term_link = site_url() . '/' . $licenceData[0]['term_link'] . '/' . $partnerData['slug'];
			}
			$background_color = $partnerData['primary_colour'];

			$asset_cat_name = $partnerData['asset_category_name'];



			$tag = explode( ' || ', $bonus_name );
			$tags = $partnerData['tags'];
			//print_r($tag);
			$pros_cons = isset($partnerData['procons'])?$partnerData['procons']:'';


			$is_featured = false;

			if(!empty($partnerData['tag'][0])){
				$is_featured = true;
			}



			$sign = "";

			/*if ($bonus_currency == "EUR") {
				$sign = "€";
			}else if ($bonus_currency == "USD") {
				$sign = "$";
			}else if ($bonus_currency == "GBP") {
				$sign = "£";
			}*/
			$sign = GetCR($partnerData['bonus_currency']);
			$structuredBonusAmount = FormatCurrency($sign,$bonus_amount);
			$structuredExclusiveBonusAmount = FormatCurrency($sign,$exc_bonus_amount);

			$explodedArr = explode(" | ", $bonus_summary);

			$bonus_summary = $explodedArr[0];

			$rating = round($rating / 2, 1);

			$remainder = 5 - $rating;
			/*$bonus = 'N.A';
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
			}*/
			/************ BONUS TEXT LOGIC START ***********/
			$bonus = '';
			$upto_text="Up To";
			$bonus_text="Bonus";
			if ($exc_bonus_amount != "" && $exc_bonus_amount != 0) {
				$bonusType="Exclusive Bonus";
				$bonus_class='exclusive';
				if (empty($partnerData['exclusive_bonus_match']))
					$bonus = "". FormatCurrency($sign,$exc_bonus_amount)."&nbsp;".$bonus_text."";
				else
					$bonus = " ".$exc_bonus_match . " " . $upto_text . " " . FormatCurrency($sign,$exc_bonus_amount)." ";
			}
			else if ($bonus_amount != "" && $bonus_amount != 0) {
				$bonusType="Welcome Bonus";
				$bonus_class='';
				if (empty($partnerData['bonus_match'])){
					if($bonus_currency=='SC')
						$bonus = " ". ucfirst($bonus_text) . "&nbsp;" .FormatCurrency($sign,$bonus_amount) ." ";
					else
						$bonus = " ". FormatCurrency($sign,$bonus_amount) . "&nbsp;" . $bonus_text." ";
				}
				else
					$bonus = " ".$bonus_match . " " . $upto_text . " " . FormatCurrency($sign,$bonus_amount)." ";
			}else{

				if($partnerData['bonus_type'] !== 'bonus'){
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
						if (empty($partnerData['bonus_match']))
						$bonus = " ". FormatCurrency($sign,$bonus_amount) . "&nbsp;" . $bonus_text." ";
						else
						$bonus = " ".$bonus_match . " " . $upto_text . " " . FormatCurrency($sign,$bonus_amount)." ";
					}
				}
			}

			$short_bonus = $bonus;
			$freebie_currency = "";
			if ($partnerData['show_freebie_currency']){
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
			$partnerData['terms'] = $licenceData[0]['terms'];
			$partnerData['term_link'] = $licenceData[0]['term_link'];
			$partnerData['filtered_term_link'] = $term_link;
			$partnerData['filtered_review_link'] = $review_link;
			$partnerData['tags'] = $tags;
			$partnerData['modified_rating'] = $rating;
			$partnerData['is_featured'] = $is_featured;
			$partnerData['filtered_bonus_summary'] = $bonus_summary;
			$partnerData['sign'] = $sign;
			$partnerData['structuredBonusAmount'] = $structuredBonusAmount;
			$partnerData['structuredExclusiveBonusAmount'] = $structuredExclusiveBonusAmount;
			$partnerData['readyMadeBonus'] = $myBonus;
			$partnerData['prosData'] = $pros;
			$partnerData['consData'] = $cons;
			$outPut['reviewBannerData'] = $partnerData;
			$outPut['paymentData'] = $paymentData;
			$outPut['softwareData'] = $softwareData;
			$outPut['licence_logo'] = $licenceData[0]['product_licences'];
			$outPut['reviewData'] = $reviewData;
			$outPut['reviewSC'] = $review_shortcode;
			$outPut['rvd'] = $rvd;
		}
		if($attributes['bannerOption']=='GameDetailBanner' && isset($attributes['gameUrl']) && !empty($attributes['gameUrl'])){
			$response_data = array();
			$banner_data = array();
			$free_game_data = array();

			$args = array(
				'post_type' => 'free_games',
				'posts_per_page' => -1,
				'post_status' => 'publish',
			);

			$free_games = get_posts( $args );

			$softwares_array = array();
			if( $free_games ) {
				foreach( $free_games as $key => $each_post) {
				$free_game_data[$key]['title'] = $each_post->post_title;
				$free_game_data[$key]['post_id'] = $each_post->ID;
				$free_game_data[$key]['link'] = post_permalink($each_post->ID);
				$free_game_data[$key]['slug'] = $each_post->post_name;
				$free_game_data[$key]['type'] = $each_post->post_type;
				$free_game_data[$key]['image'] = wp_get_attachment_url( get_post_thumbnail_id( $each_post ) , 'full' );
				$free_game_data[$key]['button_url'] = get_field('game_url', $each_post->ID);

				}
			}
			wp_reset_postdata();
			$outPut['game_data'] = $free_game_data;
		}
		wp_reset_postdata();
		return $outPut;
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
