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
class GamesBanner extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'games-banner';

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
				'block_id'=> $this->get_schema_string(),
				'title'=> $this->get_schema_string(),
				'subtitle'=> $this->get_schema_string(),
				'notrecommendedtext'=> $this->get_schema_string(),
				'titleSecond' => $this->get_schema_string(),
				'style'=> $this->get_schema_string(),
		        'content'=> $this->get_schema_string(),
		        'reviewerName'=> $this->get_schema_string(),
		        'reviewDate' => $this->get_schema_string(),
				'reviewContent'=> $this->get_schema_string(),
				'group_id'=> $this->get_schema_string(),
		        'main_partner_id'=> $this->get_schema_string(),
		        'first_partner_id'=> $this->get_schema_string(),
		        'second_partner_id'=> $this->get_schema_string(),
		        'withdrawRating'=> $this->get_schema_string(),
		        'softwareRating'=> $this->get_schema_string(),
		        'mobileRating'=> $this->get_schema_string(),
		        'bgImgID'=> $this->get_schema_number(),
		        'reiewImgID'=> $this->get_schema_number(),
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
		$block['attrs']['no_bonus_text'] = "No Bonus";
		if(get_theme_option( 'cas_toplist_no_bonus_text' )){
			$block['attrs']['no_bonus_text'] = get_theme_option( 'cas_toplist_no_bonus_text' );
		}
		if(get_theme_option( 'cas_toplist_default_terms_text' )){
			$block['attrs']['default_terms_text'] = get_theme_option( 'cas_toplist_default_terms_text' );
		}else{
			$block['attrs']['default_terms_text'] = "T&Cs Apply";
		}
		if(!isset($block['attrs']['style']) && empty($block['attrs']['style'])){
			$block['attrs']['style'] = 'games-card-view';
		}
		$groupId = (!empty($attributes['group_id'])) ? $attributes['group_id'] : get_theme_option( 'cas_toplist_group_id' );
		$attributes = $block['attrs'];
		$filteredData = array();
		$main_id = $attributes['main_partner_id'];
		$first_id = $attributes['first_partner_id'];
		$second_id = $attributes['second_partner_id'];
		$totalRating =(($attributes['withdrawRating'] + $attributes['softwareRating'] + $attributes['mobileRating']) / 3);
		$filteredData['attributes'] = $attributes;
		$filteredData['block_id'] = $attributes['block_id'];
		$filteredData['title'] = $attributes['title'];
		$filteredData['content'] = $attributes['content'];

		$mainPartnerArr = json_decode(do_shortcode("[cas-toplist-group id='$groupId' pid='$main_id' return='json']"),true);
		$mainPartner = $mainPartnerArr[0];
		$filteredData['bg_img'] = wp_get_attachment_url($attributes['bgImgID']);

		$filteredData['reviewerName'] = $attributes['reviewerName'];
		$filteredData['reviewContent'] = $attributes['reviewContent'];
		$filteredData['reviewDate'] = $attributes['reviewDate'];

		$filteredData['reviewImg'] = wp_get_attachment_url($attributes['reviewImgID']);
		$filteredData['titleSecond'] = $attributes['titleSecond'];

		$firstPartnerArr = json_decode(do_shortcode("[cas-toplist-group id='$groupId' pid='$first_id' return='json']"),true);
		$firstPartner = $firstPartnerArr[0];
		$secondPartnerArr = json_decode(do_shortcode("[cas-toplist-group id='$groupId' pid='$second_id' return='json']"),true);
		$secondPartner = $secondPartnerArr[0];
		$filteredData['withdrawRating'] = $attributes['withdrawRating'];
		$filteredData['softwareRating'] = $attributes['softwareRating'];
		$filteredData['mobileRating'] = $attributes['mobileRating'];
		$filteredData['overallRating'] = round($totalRating, 2);

		/***************************** MAIN PARTNER START **************************/
			$partner = $mainPartner['name'];
			$email = $mainPartner['email'];
			$url = $mainPartner['url'];
			$slug = $mainPartner['slug'];
			$online_since = $mainPartner['online_since'];
			$country = $mainPartner['country'];
			$bonus_name = $mainPartner['bonus_name'];
			$bonus_amount = number_format($mainPartner['bonus_amount']);
			if(!empty($mainPartner['bonus_match'])){
				$bonus_match = $mainPartner['bonus_match'] . "%";
			}else{
				$bonus_match = "";
			}
			$bonusType = $mainPartner['bonus_type'];
			$exc_bonus_amount = number_format($mainPartner['exclusive_bonus_amount']);
			$exc_bonus_match = number_format($mainPartner['exclusive_bonus_match']) . "%";
			$bonus_summary = $mainPartner['bonus_summary'];
			$bonus_currency = $mainPartner['bonus_currency'];
			$bonus_codes = $mainPartner['bonus_codes'];
			$min_deposit = $mainPartner['minimum_deposit'];
			$bonus_tc = $mainPartner['bonus_tc'];
			$bonus_type = $mainPartner['bonus_type'];

			$image_small = (!empty($mainPartner['product_assets'][0]['url']))?$mainPartner['product_assets'][0]['url']:'';
			$image = (!empty($mainPartner['product_assets'][1]['url']))?$mainPartner['product_assets'][1]['url']:'';
			$image_big =(!empty( $mainPartner['product_assets'][2]['url']))?$mainPartner['product_assets'][2]['url']:'';
			$rating = $mainPartner['rating'];
			$freespin = $mainPartner['freespin'];
			$freebie_name = $mainPartner['freebie_name'];
			$review_link = home_url() . $mainPartner['review_link'];
			$review_overview = $mainPartner['review_overview'];
			$goto_link = site_url() . '/' . $mainPartner['go_link'] . '/' . $mainPartner['slug'];
			$download_link = $mainPartner['download_link'];
			$button_text = $mainPartner['cta_button_text'];

			$term = $mainPartner['terms'];
			$term_link = "";
			if($term){
				$term_link = site_url() . '/' . $mainPartner['term_link'] . '/' . $mainPartner['slug'];
			}
			$background_color = $mainPartner['primary_colour'];

			$asset_cat_name = $mainPartner['asset_category_name'];



			$tag = explode( ' || ', $bonus_name );
			$tags = $mainPartner['tags'];
			//print_r($tag);
			$pros_cons = isset($mainPartner['procons'])?$mainPartner['procons']:'';


			$is_featured = false;

			if(!empty($mainPartner['tag'][0])){
				$is_featured = true;
			}

			$sign = "";
			$sign = GetCR($mainPartner['bonus_currency']);
			$structuredBonusAmount = FormatCurrency($sign,$bonus_amount);
			$structuredExclusiveBonusAmount = FormatCurrency($sign,$exc_bonus_amount);

			$explodedArr = explode(" | ", $bonus_summary);

			$bonus_summary = $explodedArr[0];

			$rating = round($rating / 2, 1);

			$remainder = 5 - $rating;
			
			/************ BONUS TEXT LOGIC START ***********/
			$bonus = '';
			$upto_text="Up To";
			$bonus_text="Bonus";
			if ($exc_bonus_amount != "" && $exc_bonus_amount != 0) {
				$bonusType="Exclusive Bonus";
				$bonus_class='exclusive';
				if (empty($mainPartner['exclusive_bonus_match']))
					$bonus = "". FormatCurrency($sign,$exc_bonus_amount)."&nbsp;".$bonus_text."";
				else
					$bonus = " ".$exc_bonus_match . " " . $upto_text . " " . FormatCurrency($sign,$exc_bonus_amount)." ";
			}
			else if ($bonus_amount != "" && $bonus_amount != 0) {
				$bonusType="Welcome Bonus";
				$bonus_class='';
				if (empty($mainPartner['bonus_match'])){
					if($bonus_currency=='SC')
						$bonus = " ". ucfirst($bonus_text) . "&nbsp;" .FormatCurrency($sign,$bonus_amount) ." ";
					else
						$bonus = " ". FormatCurrency($sign,$bonus_amount) . "&nbsp;" . $bonus_text." ";
				}
				else
					$bonus = " ".$bonus_match . " " . $upto_text . " " . FormatCurrency($sign,$bonus_amount)." ";
			}else{

				if($mainPartner['bonus_type'] !== 'bonus'){
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
						if (empty($mainPartner['bonus_match']))
						$bonus = " ". FormatCurrency($sign,$bonus_amount) . "&nbsp;" . $bonus_text." ";
						else
						$bonus = " ".$bonus_match . " " . $upto_text . " " . FormatCurrency($sign,$bonus_amount)." ";
					}
				}
			}

			$short_bonus = $bonus;
			$freebie_currency = "";
			if ($mainPartner['show_freebie_currency']){
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
			$pros_cons_data = (array) json_decode(do_shortcode("[cas-pro-cons pid='$main_id' is-featured='2' review='return']"));
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
			$mainPartner['goto_link'] = $goto_link;
			$mainPartner['filtered_term_link'] = $term_link;
			$mainPartner['filtered_review_link'] = $review_link;
			$mainPartner['tags'] = $tags;
			$mainPartner['modified_rating'] = $rating;
			$mainPartner['is_featured'] = $is_featured;
			$mainPartner['filtered_bonus_summary'] = $bonus_summary;
			$mainPartner['sign'] = $sign;
			$mainPartner['structuredBonusAmount'] = $structuredBonusAmount;
			$mainPartner['structuredExclusiveBonusAmount'] = $structuredExclusiveBonusAmount;
			$mainPartner['readyMadeBonus'] = $myBonus;
			$mainPartner['prosData'] = $pros;
			$mainPartner['consData'] = $cons;
			$filteredData['main_partner'] = $mainPartner;
		/********************************** MAIN PARTNER END *******************************/
		/***************************** FIRST PARTNER START **************************/
			$partner = $firstPartner['name'];
			$email = $firstPartner['email'];
			$url = $firstPartner['url'];
			$slug = $firstPartner['slug'];
			$online_since = $firstPartner['online_since'];
			$country = $firstPartner['country'];
			$bonus_name = $firstPartner['bonus_name'];
			$bonus_amount = number_format($firstPartner['bonus_amount']);
			if(!empty($firstPartner['bonus_match'])){
				$bonus_match = $firstPartner['bonus_match'] . "%";
			}else{
				$bonus_match = "";
			}
			$bonusType = $firstPartner['bonus_type'];
			$exc_bonus_amount = number_format($firstPartner['exclusive_bonus_amount']);
			$exc_bonus_match = number_format($firstPartner['exclusive_bonus_match']) . "%";
			$bonus_summary = $firstPartner['bonus_summary'];
			$bonus_currency = $firstPartner['bonus_currency'];
			$bonus_codes = $firstPartner['bonus_codes'];
			$min_deposit = $firstPartner['minimum_deposit'];
			$bonus_tc = $firstPartner['bonus_tc'];
			$bonus_type = $firstPartner['bonus_type'];

			$image_small = (!empty($firstPartner['product_assets'][0]['url']))?$firstPartner['product_assets'][0]['url']:'';
			$image = (!empty($firstPartner['product_assets'][1]['url']))?$firstPartner['product_assets'][1]['url']:'';
			$image_big =(!empty( $firstPartner['product_assets'][2]['url']))?$firstPartner['product_assets'][2]['url']:'';
			$rating = $firstPartner['rating'];
			$freespin = $firstPartner['freespin'];
			$freebie_name = $firstPartner['freebie_name'];
			$review_link = home_url() . $firstPartner['review_link'];
			$review_overview = $firstPartner['review_overview'];
			$goto_link = site_url() . '/' . $firstPartner['go_link'] . '/' . $firstPartner['slug'];
			$download_link = $firstPartner['download_link'];
			$button_text = $firstPartner['cta_button_text'];

			$term = $firstPartner['terms'];
			$term_link = "";
			if($term){
				$term_link = site_url() . '/' . $firstPartner['term_link'] . '/' . $firstPartner['slug'];
			}
			$background_color = $firstPartner['primary_colour'];

			$asset_cat_name = $firstPartner['asset_category_name'];



			$tag = explode( ' || ', $bonus_name );
			$tags = $firstPartner['tags'];
			//print_r($tag);
			$pros_cons = isset($firstPartner['procons'])?$firstPartner['procons']:'';


			$is_featured = false;

			if(!empty($firstPartner['tag'][0])){
				$is_featured = true;
			}

			$sign = "";
			$sign = GetCR($firstPartner['bonus_currency']);
			$structuredBonusAmount = FormatCurrency($sign,$bonus_amount);
			$structuredExclusiveBonusAmount = FormatCurrency($sign,$exc_bonus_amount);

			$explodedArr = explode(" | ", $bonus_summary);

			$bonus_summary = $explodedArr[0];

			$rating = round($rating / 2, 1);

			$remainder = 5 - $rating;
			
			/************ BONUS TEXT LOGIC START ***********/
			$bonus = '';
			$upto_text="Up To";
			$bonus_text="Bonus";
			if ($exc_bonus_amount != "" && $exc_bonus_amount != 0) {
				$bonusType="Exclusive Bonus";
				$bonus_class='exclusive';
				if (empty($firstPartner['exclusive_bonus_match']))
					$bonus = "". FormatCurrency($sign,$exc_bonus_amount)."&nbsp;".$bonus_text."";
				else
					$bonus = " ".$exc_bonus_match . " " . $upto_text . " " . FormatCurrency($sign,$exc_bonus_amount)." ";
			}
			else if ($bonus_amount != "" && $bonus_amount != 0) {
				$bonusType="Welcome Bonus";
				$bonus_class='';
				if (empty($firstPartner['bonus_match'])){
					if($bonus_currency=='SC')
						$bonus = " ". ucfirst($bonus_text) . "&nbsp;" .FormatCurrency($sign,$bonus_amount) ." ";
					else
						$bonus = " ". FormatCurrency($sign,$bonus_amount) . "&nbsp;" . $bonus_text." ";
				}
				else
					$bonus = " ".$bonus_match . " " . $upto_text . " " . FormatCurrency($sign,$bonus_amount)." ";
			}else{

				if($firstPartner['bonus_type'] !== 'bonus'){
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
						if (empty($firstPartner['bonus_match']))
						$bonus = " ". FormatCurrency($sign,$bonus_amount) . "&nbsp;" . $bonus_text." ";
						else
						$bonus = " ".$bonus_match . " " . $upto_text . " " . FormatCurrency($sign,$bonus_amount)." ";
					}
				}
			}

			$short_bonus = $bonus;
			$freebie_currency = "";
			if ($firstPartner['show_freebie_currency']){
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
			$pros_cons_data = (array) json_decode(do_shortcode("[cas-pro-cons pid='$main_id' is-featured='2' review='return']"));
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
			$firstPartner['goto_link'] = $goto_link;
			$firstPartner['filtered_term_link'] = $term_link;
			$firstPartner['filtered_review_link'] = $review_link;
			$firstPartner['tags'] = $tags;
			$firstPartner['modified_rating'] = $rating;
			$firstPartner['is_featured'] = $is_featured;
			$firstPartner['filtered_bonus_summary'] = $bonus_summary;
			$firstPartner['sign'] = $sign;
			$firstPartner['structuredBonusAmount'] = $structuredBonusAmount;
			$firstPartner['structuredExclusiveBonusAmount'] = $structuredExclusiveBonusAmount;
			$firstPartner['readyMadeBonus'] = $myBonus;
			$firstPartner['prosData'] = $pros;
			$firstPartner['consData'] = $cons;
			$filteredData['first_partner'] = $firstPartner;
		/********************************** FIRST PARTNER END *******************************/
		/***************************** SECOND PARTNER START **************************/
			$partner = $secondPartner['name'];
			$email = $secondPartner['email'];
			$url = $secondPartner['url'];
			$slug = $secondPartner['slug'];
			$online_since = $secondPartner['online_since'];
			$country = $secondPartner['country'];
			$bonus_name = $secondPartner['bonus_name'];
			$bonus_amount = number_format($secondPartner['bonus_amount']);
			if(!empty($secondPartner['bonus_match'])){
				$bonus_match = $secondPartner['bonus_match'] . "%";
			}else{
				$bonus_match = "";
			}
			$bonusType = $secondPartner['bonus_type'];
			$exc_bonus_amount = number_format($secondPartner['exclusive_bonus_amount']);
			$exc_bonus_match = number_format($secondPartner['exclusive_bonus_match']) . "%";
			$bonus_summary = $secondPartner['bonus_summary'];
			$bonus_currency = $secondPartner['bonus_currency'];
			$bonus_codes = $secondPartner['bonus_codes'];
			$min_deposit = $secondPartner['minimum_deposit'];
			$bonus_tc = $secondPartner['bonus_tc'];
			$bonus_type = $secondPartner['bonus_type'];

			$image_small = (!empty($secondPartner['product_assets'][0]['url']))?$secondPartner['product_assets'][0]['url']:'';
			$image = (!empty($secondPartner['product_assets'][1]['url']))?$secondPartner['product_assets'][1]['url']:'';
			$image_big =(!empty( $secondPartner['product_assets'][2]['url']))?$secondPartner['product_assets'][2]['url']:'';
			$rating = $secondPartner['rating'];
			$freespin = $secondPartner['freespin'];
			$freebie_name = $secondPartner['freebie_name'];
			$review_link = home_url() . $secondPartner['review_link'];
			$review_overview = $secondPartner['review_overview'];
			$goto_link = site_url() . '/' . $secondPartner['go_link'] . '/' . $secondPartner['slug'];
			$download_link = $secondPartner['download_link'];
			$button_text = $secondPartner['cta_button_text'];

			$term = $secondPartner['terms'];
			$term_link = "";
			if($term){
				$term_link = site_url() . '/' . $secondPartner['term_link'] . '/' . $secondPartner['slug'];
			}
			$background_color = $secondPartner['primary_colour'];

			$asset_cat_name = $secondPartner['asset_category_name'];



			$tag = explode( ' || ', $bonus_name );
			$tags = $secondPartner['tags'];
			//print_r($tag);
			$pros_cons = isset($secondPartner['procons'])?$secondPartner['procons']:'';


			$is_featured = false;

			if(!empty($secondPartner['tag'][0])){
				$is_featured = true;
			}

			$sign = "";
			$sign = GetCR($secondPartner['bonus_currency']);
			$structuredBonusAmount = FormatCurrency($sign,$bonus_amount);
			$structuredExclusiveBonusAmount = FormatCurrency($sign,$exc_bonus_amount);

			$explodedArr = explode(" | ", $bonus_summary);

			$bonus_summary = $explodedArr[0];

			$rating = round($rating / 2, 1);

			$remainder = 5 - $rating;
			
			/************ BONUS TEXT LOGIC START ***********/
			$bonus = '';
			$upto_text="Up To";
			$bonus_text="Bonus";
			if ($exc_bonus_amount != "" && $exc_bonus_amount != 0) {
				$bonusType="Exclusive Bonus";
				$bonus_class='exclusive';
				if (empty($secondPartner['exclusive_bonus_match']))
					$bonus = "". FormatCurrency($sign,$exc_bonus_amount)."&nbsp;".$bonus_text."";
				else
					$bonus = " ".$exc_bonus_match . " " . $upto_text . " " . FormatCurrency($sign,$exc_bonus_amount)." ";
			}
			else if ($bonus_amount != "" && $bonus_amount != 0) {
				$bonusType="Welcome Bonus";
				$bonus_class='';
				if (empty($secondPartner['bonus_match'])){
					if($bonus_currency=='SC')
						$bonus = " ". ucfirst($bonus_text) . "&nbsp;" .FormatCurrency($sign,$bonus_amount) ." ";
					else
						$bonus = " ". FormatCurrency($sign,$bonus_amount) . "&nbsp;" . $bonus_text." ";
				}
				else
					$bonus = " ".$bonus_match . " " . $upto_text . " " . FormatCurrency($sign,$bonus_amount)." ";
			}else{

				if($secondPartner['bonus_type'] !== 'bonus'){
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
						if (empty($secondPartner['bonus_match']))
						$bonus = " ". FormatCurrency($sign,$bonus_amount) . "&nbsp;" . $bonus_text." ";
						else
						$bonus = " ".$bonus_match . " " . $upto_text . " " . FormatCurrency($sign,$bonus_amount)." ";
					}
				}
			}

			$short_bonus = $bonus;
			$freebie_currency = "";
			if ($secondPartner['show_freebie_currency']){
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
			$pros_cons_data = (array) json_decode(do_shortcode("[cas-pro-cons pid='$main_id' is-featured='2' review='return']"));
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
			$secondPartner['goto_link'] = $goto_link;
			$secondPartner['filtered_term_link'] = $term_link;
			$secondPartner['filtered_review_link'] = $review_link;
			$secondPartner['tags'] = $tags;
			$secondPartner['modified_rating'] = $rating;
			$secondPartner['is_featured'] = $is_featured;
			$secondPartner['filtered_bonus_summary'] = $bonus_summary;
			$secondPartner['sign'] = $sign;
			$secondPartner['structuredBonusAmount'] = $structuredBonusAmount;
			$secondPartner['structuredExclusiveBonusAmount'] = $structuredExclusiveBonusAmount;
			$secondPartner['readyMadeBonus'] = $myBonus;
			$secondPartner['prosData'] = $pros;
			$secondPartner['consData'] = $cons;
			$filteredData['second_partner'] = $secondPartner;
		/********************************** SECOND PARTNER END *******************************/
		return $filteredData;
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
