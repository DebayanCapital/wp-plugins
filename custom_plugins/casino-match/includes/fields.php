<?php
if( function_exists('acf_add_local_field_group') ):
function casino_match_field_group(){
	acf_add_local_field_group(array(
		'key' => 'group_casino_match',
			'title' => 'Casino match',
			'fields' => array(
				array(
					'key' => 'field_5fd2300617a87',
					'label' => 'Option',
					'name' => 'option',
					'type' => 'repeater',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array(
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'collapsed' => '',
					'min' => 0,
					'max' => 0,
					'layout' => 'table',
					'button_label' => 'Add option',
					'sub_fields' => array(
						array(
							'key' => 'field_5fd2303517a88',
							'label' => 'Option name',
							'name' => 'option_name',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array(
								'width' => '18',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
						),
						array(
							'key' => 'field_5fd2334d17a89',
							'label' => 'Partner ID',
							'name' => 'partner_id',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array(
								'width' => '18',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => 'Comma separated partner ID',
							'prepend' => '',
							'append' => '',
							'min' => '',
							'max' => '',
							'step' => '',
						),
						array(
							'key' => 'field_5fd2334d17a90',
									'label' => 'Select Country',
									'name' => 'country',
									'type' => 'select',
									'instructions' => '',
									'required' => 0,
									'conditional_logic' => 0,
									'wrapper' => array(
										'width' => '18',
										'class' => '',
										'id' => '',
									),
							'default_value' => 'row',
							'choices' => array(
								'row'	=> 'Rest of the World',
								'us' => 'US',
								'gb' => 'UK'
							),
							'allow_null' => 0,
							'multiple' => 0,
							'ui' => 0,
							'ajax' => 0,
							'placeholder' => '',
						),
						array(
							'key' => 'field_5fd2334d17a91',
							'label' => 'State',
							'name' => 'state',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array(
								'width' => '18',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => 'Use state short form only',
							'prepend' => '',
							'append' => '',
							'min' => '',
							'max' => '',
							'step' => '',
						),
						array(
							'key' => 'field_5fd2334d17a92',
							'label' => 'State (Exclude)',
							'name' => 'state_exclude',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array(
								'width' => '18',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => 'Use state short form only (Use comma seperated for multiple values)',
							'prepend' => '',
							'append' => '',
							'min' => '',
							'max' => '',
							'step' => '',
						),
						array(
							'key' => 'field_5fd233af17a8a',
							'label' => 'Option image',
							'name' => 'option_image',
							'type' => 'image',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array(
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'return_format' => 'url',
							'preview_size' => 'medium',
							'library' => 'all',
							'min_width' => '',
							'min_height' => '',
							'min_size' => '',
							'max_width' => '',
							'max_height' => '',
							'max_size' => '',
							'mime_types' => '',
						),
					),
				),
				array(
	
					/* ... Insert generic settings here ... */
					'key' => 'field_1',
							'label' => 'Select Option Type',
							'name' => 'option_type',
							'type' => 'select',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array(
								'width' => '100',
								'class' => '',
								'id' => '',
							),
							'default_value' => 'radio_button',
							//'placeholder' => 'partner ID separated by comma',
							// 'prepend' => '',
							// 'append' => '',
							// 'min' => '',
							// 'max' => '',
							// 'step' => '',
					/* (array) Array of choices where the key ('red') is used as value and the value ('Red') is used as label */
					'choices' => array(
						'radio_button'	=> 'Radio Button',
						'checkbox' => 'Checkbox'
					),
					
					/* (bool) Allow a null (blank) value to be selected. Defaults to 0 */
					'allow_null' => 0,
					
					/* (bool) Allow mulitple choices to be selected. Defaults to 0 */
					'multiple' => 0,
					
					/* (bool) Use the select2 interfacte. Defaults to 0 */
					'ui' => 0,
					
					/* (bool) Load choices via AJAX. The ui setting must also be true for this to work. Defaults to 0 */
					'ajax' => 0,
					
					/* (string) Appears within the select2 input. Defaults to '' */
					'placeholder' => '',
					
				),
			),
			'location' => array(
				array(
					array(
						'param' => 'post_type',
						'operator' => '==',
						'value' => 'casino_match',
					),
				),
			),
			'menu_order' => 0,
			'position' => 'normal',
			'style' => 'default',
			'label_placement' => 'top',
			'instruction_placement' => 'label',
			'hide_on_screen' => '',
			'active' => true,
			'description' => '',
	));
}

add_action('acf/init', 'casino_match_field_group');
endif;
add_action('rest_api_init', function () {
	register_rest_route( 'get_match_result/v1', 'casino_guide',array(
			'methods'  => 'POST',
			'callback' => 'get_casino_match_result'
	));
});
function get_casino_match_result($request){
	$inputs = json_decode(file_get_contents('php://input'),true);
	$partnerArr = array();
	for($i=0;$i<count($inputs);$i++){
		$partnerArr[] = $inputs[$i]['partnerId'];
	}
	//echo "reqArr=>";print_r($partnerArr);
	$newArr = array();
	$commonPartners = "";
	for($i=0;$i<count($partnerArr);$i++){
		$newArr[] = array_map('trim', explode(",",$partnerArr[$i]));
	}
	$commonPartners = array_intersect(...$newArr);
	//echo "new=>";print_r($newArr);
	//echo "common=>";print_r($commonPartners);exit;
	$detailProducts = array();
	if(!empty($commonPartners)){
	foreach($commonPartners AS $key=>$val){
		$generated_shortcode = "[cas-toplist-group id='".get_theme_option( 'cas_toplist_group_id' )."' pid='" . $val .  "' return='json']";
		$products = json_decode(do_shortcode($generated_shortcode),true);
		if(count($products)>0){
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
					$products[$i]['vip_service_available'] = get_field( "vip_service_available", $reviewPageId );
					$products[$i]['ecogra_audited'] = get_field( "ecogra_audited", $reviewPageId );
					$products[$i]['reward_scheme'] = get_field( "reward_scheme", $reviewPageId );
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
		$detailProducts[] = $products[0];
	}
	//echo $generated_shortcode;
	//print_r($detailProducts);
	echo json_encode($detailProducts); die();
	}else{
		$detailProducts = "";die();
	}
	//$a=array("a"=>"red","b"=>"green","c"=>"blue");
	//array_walk($inputs,"myarfunction");
}