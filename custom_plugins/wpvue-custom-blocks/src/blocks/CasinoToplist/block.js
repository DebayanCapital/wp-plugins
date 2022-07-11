/**
 * BLOCK: Casino Toplist
 *
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

/**
 * External dependencies
 */

const {__} = wp.i18n
const {registerBlockType} = wp.blocks
const {RichText,RichTextToolbarButton,MediaUpload,InspectorControls} = wp.blockEditor
const {TextControl,TextareaControl,PanelBody,ToggleControl} = wp.components
const {FormToggle} = wp.components
const {SelectControl} = wp.components
const { Button } = wp.components


/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType('wpvue/casino-toplist', {
    title: __('Casino Toplist'),
    icon: 'tickets-alt',
    category: 'CasinoPages',
    keywords: [
        __('casino list'),
        __('casino top list'),
        __('top list'),
        __('toplist'),
    ],
    supports: {
        html: false,
        reusable: false,
        align: false
    },

    // Set up data model for custom block
    attributes: {
        heading: {
            type: 'string',
        },
        subheading: {
            type: 'string',
        },
        block_id: {
           type: 'string',
        },
        group_id: {
            type: 'string',
        },
        partner_id: {
            type: 'string',
        },
        tag:{
        type:'string',
        },
        tag_relation:{
            type:'string',
            default:'OR'
        },
        pros_cons:{
            type:'string',
            default:'2'
        },
        style: {
            type: 'string',
            default:'rows'
        },
        description: {
            type: 'string',
        },
        bonus_type: {
            type: 'string',
        },
        show_load_more: {
            type: 'string',
        },
        load_more_text: {
            type: 'string',
            default:'Load More Casino'
        },
        show_supported_casino: {
            type: 'string',
        },
        supported_casino: {
            type: 'string',
        },
        software_id: {
            type: 'string',
        },
        payment_id: {
            type: 'string',
        },

        show_terms: {
            type: 'string',
        },
        term_text: {
            type: 'string',
            default: "Click for full T&C's"
        },
        term_separator: {
            type: 'string',
            default: '•'
        },
        start_at_desktop: {
            type: 'string',
        },
        qty_desktop: {
            type: 'string',
        },
        start_at_mobile: {
            type: 'string',
        },
        qty_mobile: {
            type: 'string',
        },
        tag_sticker:{
            type: 'string',
        },
        load_more_qty: {
            type: 'string',
        },
        check_all_casino:{
            type:'boolean',
            default:false
        },
        all_casino_url:{
            type:'string',
        },
        check_all_casino_text:{
            type:'string',
            default:'check all casino'
        },
        imgURL: {
            type: 'string',
        },
        imgID:{
            type:'number'
        },
        imgAlt:{
            type:'string',
            source:'attribute',
            attribute:'alt',
            selector:'img'
        },
        sideImgURL: {
            type: 'string',
        },
        sideImgID:{
            type:'number'
        },
            sideImgAlt:{
            type:'string',
            source:'attribute',
            attribute:'alt',
            selector:'img'
        },
        enable_free_text_row: {
			type: 'boolean',
			default: false
		},
		info: {
			type: 'array',
			selector: '.info-wrap'
		},
                show_more_desktop: {
			type: 'boolean',
			default: false
		},
            show_more_mobile: {
			type: 'boolean',
			default: true
		},
            text_tag: {
            type: 'string',
        }
    },

    edit:(props)=> {
        var block_id = props.attributes.block_id;
        var heading = props.attributes.heading;
        var subheading = props.attributes.subheading;
        var group_id = props.attributes.group_id;
        var partner_id = props.attributes.partner_id;
        var bonus_type = props.attributes.bonus_type;
        var style = props.attributes.style;
        var show_load_more = props.attributes.show_load_more;
        var show_terms = props.attributes.show_terms;
        var term_text = props.attributes.term_text;
        var term_separator = props.attributes.term_separator;
        var show_supported_casino = props.attributes.show_supported_casino;
        var supported_casino = props.attributes.supported_casino;
        var software_id = props.attributes.software_id;
        var payment_id = props.attributes.payment_id;
        var start_at_desktop = props.attributes.start_at_desktop;
        var qty_desktop = props.attributes.qty_desktop;
        var start_at_mobile = props.attributes.start_at_mobile;
        var qty_mobile = props.attributes.qty_mobile;
        var load_more_qty = props.attributes.load_more_qty;
        var check_all_casino = props.attributes.check_all_casino;
        var all_casino_url = props.attributes.all_casino_url;
        var load_more_text = props.attributes.load_more_text;
        var check_all_casino_text = props.attributes.check_all_casino_text;
        var tag = props.attributes.tag;
        var tag_relation = props.attributes.tag_relation;
        var pros_cons = props.attributes.pros_cons;
        var description = props.attributes.description;
        var tag_sticker = props.attributes.tag_sticker;
        var enable_free_text_row = props.attributes.enable_free_text_row;
        var show_more_desktop = props.attributes.show_more_desktop;
        var show_more_mobile = props.attributes.show_more_mobile;
        var text_tag = props.attributes.text_tag;


        function onChangeBlockId(content) {
            props.setAttributes({block_id: content});
        }
        function onChangeHeading(content) {
            props.setAttributes({heading: content});
        }
        function onChangeSubHeading(content) {
            props.setAttributes({subheading: content});
        }
        function onChangeGroupId(content) {
            props.setAttributes({group_id: content});
        }
        function onChangePartnerId(content) {
            props.setAttributes({partner_id: content});
        }
        function onChangeTag(content) {
            props.setAttributes({tag: content});
        }
        function onChangeTagRelation(content) {
            props.setAttributes({tag_relation: content});
        }
        function onChangeType(content) {
            props.setAttributes({bonus_type: content});
        }
        function onChangeProsCons(content) {
            props.setAttributes({pros_cons: content});
        }
        var onChangeStyle = function (content) {
            props.setAttributes({style: content});
        };
        var onChangeDescription = function (content) {
            props.setAttributes({description: content});
        };
        var onChangeLoadMore = function (content) {
            props.setAttributes({show_load_more: content});
        };
        var onChangeShowTerms = function (content) {
            props.setAttributes({show_terms: content});
        };
        var onChangeTermText = function (content) {
            props.setAttributes({term_text: content});
        };
        var onChangeTermSeparator = function (content) {
            props.setAttributes({term_separator: content});
        };
        var onChangeShowSupportedCasino = function (content) {
            props.setAttributes({show_supported_casino: content});
        };
        var onChangeSupportedCasino = function (content) {
            props.setAttributes({supported_casino: content});
        };
        var onChangeSoftwareId = function (content) {
            props.setAttributes({software_id: content});
        };
        var onChangePaymentId = function (content) {
            props.setAttributes({payment_id: content});
        };
        var onChangeStartDesktop = function (content) {
            props.setAttributes({start_at_desktop: content});
        };
        var onChangeQtyDesktop = function (content) {
            props.setAttributes({qty_desktop: content});
        };
        var onChangeStartMobile = function (content) {
            props.setAttributes({start_at_mobile: content});
        };
        var onChangeQtyMobile = function (content) {
            props.setAttributes({qty_mobile: content});
        };
        var onChangeLoadMoreQty = function (content) {
            props.setAttributes({load_more_qty: content});
        };
        var onChangeChekAll = function (state) {
            props.setAttributes({check_all_casino: (!check_all_casino)?true:false});
            
        }
        var onChangeCasinoUrl = function (content) {
            props.setAttributes({all_casino_url: content});
        };
        var onChangeCheckAllCasinoText = function (content) {
            props.setAttributes({check_all_casino_text: content});
        };
        var onChangeLoadMoreText = function (content) {
            props.setAttributes({load_more_text: content});
        };
        var onChangeTagSticker = function (content) {
            props.setAttributes({tag_sticker: content});
        };

        var onChangeShowMoreDesktop = function (state) {
            props.setAttributes({show_more_desktop: (!show_more_desktop)?true:false});
            
        }

        var onChangeShowMoreMobile = function (state) {
            props.setAttributes({show_more_mobile: (!show_more_mobile)?true:false});
            
        }
        var onChangeTextTag = function onChangeTextTag ( content ){
            props.setAttributes({text_tag: content});
        } 
        
        const onFileSelect = (img)=>{
            props.setAttributes({
              imgID : img.id,
              imgAlt: img.alt,
            });
            props.setAttributes({imgURL: img.url});  
              //console.log('It is working!');
        }
        const onRemoveImg = () => {
            props.setAttributes({
              imgURL :  null,
              imgID : null,
              imgAlt: null
            });
        }
        const onSideImgSelect = (img)=>{
            props.setAttributes({
              sideImgID : img.id,
              sideImgAlt: img.alt
            });
            props.setAttributes({sideImgURL: img.url});  
              //console.log('It is working!');
        }
        const onRemoveSideImg = () => {
            props.setAttributes({
              sideImgURL :  null,
              sideImgID : null,
              sideImgAlt: null
            });
        }

        var onChangeFreetext = function (state) {
            props.setAttributes({enable_free_text_row: (!enable_free_text_row)?true:false});
            
        }

        // function onChangeFreetext(content) {
        //     props.setAttributes({enable_free_text_row: true});
        //     props.setAttributes({show_more_desktop: false});
        //     props.setAttributes({show_more_mobile: true});
        // }
        const {  attributes: { info = [] }, setAttributes } = props;
        let bindPartnerData = [];
		bindPartnerData = wpvcb_blocks_scripts_data_params.data.cas_data.casino_partners;

		const infoList = (value) => {
            return(
                value.sort((a, b) => a.index - b.index).map(infoItem => {
                    return(
                        <div className="info-item">
                            <Button
                                className="remove-item cross-button"
                                onClick={ () => {
                                    const newInfo = info.filter(item => item.index != infoItem.index).map(i => {
                                        if(i.index > infoItem.index){
                                            i.index -= 1;
                                        }
                                        return i;
                                    } );
                                    setAttributes({ info: newInfo });
                                } }
                            >&times;</Button>
                            <p className="section-heading">Partner {infoItem.index+1}</p>
							<SelectControl
                                className="info-item-partner_id"
                                label={ __( 'Select partner', 'wpvcb-blocks' ) }
                                value={ infoItem.partner_id } 
                                options={ bindPartnerData }
                                onChange={ partner_id => {
                                    const newObject = Object.assign({}, infoItem, {
                                        partner_id: partner_id
                                    });
                                    setAttributes({
                                        info: [...info.filter(
                                            item => item.index != infoItem.index
                                        ), newObject]
                                    });
                                } }
                            />
							<TextControl
                               className="info-text"
                               label={ __( 'Text', 'wpvcb-blocks' ) }
                               value={infoItem.text}
                               onChange={ text => {
                                    const newObject = Object.assign({}, infoItem, {
                                        text: text
                                    });
                                    setAttributes({
                                        info: [...info.filter(
                                            item => item.index != infoItem.index
                                        ), newObject]
                                    });
                                } }
                            />
                        </div>
                    )
                })
            )
        }   
                        
return [
        <InspectorControls>
            <PanelBody title="Block ID">                       
                <TextControl
                label={__('Block ID')}
                onChange={onChangeBlockId} 
                value={block_id}
                placeholder={__('Unique ID of the block')}
                />
            </PanelBody>               
        </InspectorControls>,
        <div id="block-casino-list" >
            <div class="block-header">Casino Toplist</div>
            <SelectControl
                label="Text Tag"
                value={ text_tag }
                options={ [
                    { label: 'H1', value: 'h1' },
                    { label: 'H2', value: 'h2' },
                    { label: 'H3', value: 'h3' },
                    { label: 'H4', value: 'h4' },
                    { label: 'P', value: 'p' },
                ] }
            //onChange={ ( style ) => props.setAttributes( { style: style } ) }
            onChange={onChangeTextTag} 
            />
            <TextControl
                label={__('Heading')}
                onChange={onChangeHeading} 
                value={heading}
                placeholder={__('Heading')}
                />
            <TextControl
                label={__('Sub-Heading')}
                onChange={onChangeSubHeading} 
                value={subheading}
                placeholder={__('Sub-Heading')}
                />
            <TextControl
                label={__('Group ID')}
                onChange={onChangeGroupId} 
                value={group_id}
                placeholder={__('Group ID')}
                />
            <TextControl
                label={__('Partner ID')}
                onChange={onChangePartnerId} 
                value={partner_id}
                placeholder={__('Partner ID')}
                />
            <TextControl
                label={__('Tag Parameter')}
                onChange={onChangeTag} 
                value={tag}
                placeholder={__('Enter tag name with , seperated eg. HOT1, HOT2 etc')}
                />
            <SelectControl
                label="Tag relation"
                value={ tag_relation }
                options={ [
            
                { label: 'OR', value: 'OR' },
                { label: 'AND', value: 'AND' },
                
                ] }
                onChange={onChangeTagRelation} 
                />    
            <SelectControl
                label="Bonus type"
                value={ bonus_type }
                options={ [
            {label: 'Select bonus type', value: '' },
                { label: 'High Roller', value: 'high_roller' },
                { label: 'Cash Back', value: 'cash_back' },
                { label: 'First Deposit', value: 'first_deposit' },
                { label: 'Lotto', value: 'lotto' },
                { label: 'No Deposit', value: 'no_deposit' },
                ] }
                onChange={onChangeType} 
                />
            <SelectControl
                label="Pros-cons Options"
                value={ pros_cons }
                options={ [
            
                { label: 'All', value: '2' },
                { label: 'Featured only', value: '1' },
                { label: 'Non featured only', value: '0' },
                
                ] }
                onChange={onChangeProsCons} 
                /> 
            <SelectControl
                label="Style"
                value={ style }
                options={ [
                { label: 'Rows', value: 'rows' },
                { label: 'Rows with Bonus Tab', value: 'rows-bonus-tab' },
                { label: 'Rows with Description', value: 'rows-with-description' },
                { label: 'Rows with Background', value: 'rows-with-background' },
                { label: 'Rows with Serial Number', value: 'rows-with-serial' },    
                { label: 'Casino High Roller', value: 'casino-roller' },    
                { label: 'Casino List For Software Details Page', value: 'casino-netent' },
                { label: 'Rows with top description', value: 'rows-with-top-description' },
                { label: 'Review Footer', value: 'review-footer' },
                { label: 'Software Details With Background', value: 'software-with-background' },
                { label: 'Payment Details With Background', value: 'payment-with-background' },
                { label: 'Jackpot footer With Background', value: 'jackpot-footer-with-background' },
                { label: 'Rows With Gallery Style 1', value: 'row-gallery-style-1' },
                { label: 'Rows With Gallery Style 2', value: 'row-gallery-style-2' },
                { label: 'Toplist Slider', value: 'toplist-slider' },
                { label: 'Toplist For Review Details Page', value: 'toplist-for-review' },
                { label: 'Jackpot Style', value: 'jackpot-style' },
                ] }
                onChange={onChangeStyle} 
                />
                {
                (style=='toplist-for-review')? 
                <TextareaControl
                label={__('Custom text to display on toplist')}
                onChange={onChangeDescription} 
                value={description}
                placeholder={__('enter custom text')}
                /> : null
                }
                {
                (style=='jackpot-footer-with-background' || style=='rows-with-background' || style=='rows-background-netent' || style=='software-with-background' || style=='payment-with-background')? 
                
                (props.attributes.imgURL) ? 
                <div className="img-upload-wrapper-bg">
                <div className={ props.className }>
                    <img 
                    src={props.attributes.imgURL} 
                    alt={props.attributes.imgAlt}
                    />
                </div>
                    {(props.isSelected)?( <Button className="button button-primary" onClick={onRemoveImg}>Remove image</Button> ):null}
                </div>
                    
                : <MediaUpload 
                onSelect={onFileSelect}
                value={props.attributes.imgID}
                render={({open})=>
                <Button
                onClick={open}
                className="button button-primary"
                >
                Background Image
                </Button>
                }
                />
                    
                : null
                }
                {
                (style=='jackpot-footer-with-background' || style=='rows-with-background' || style=='rows-background-netent' || style=='software-with-background' || style=='payment-with-background' || style=='rows-with-serial')? 
                
                (props.attributes.sideImgURL) ? 
                <div className="img-upload-wrapper-side">
                <div className={ props.className }>
                    <img 
                    src={props.attributes.sideImgURL} 
                    alt={props.attributes.sideImgAlt}
                    />
                </div>
                    {(props.isSelected)?( <Button className="button button-primary" onClick={onRemoveSideImg}>Remove image</Button> ):null}
                </div>
                    
                : <MediaUpload 
                onSelect={onSideImgSelect}
                value={props.attributes.sideImgID}
                render={({open})=>
                <Button
                onClick={open}
                className="button button-primary"
                >
                Side Image (Upload if Any)
                </Button>
                }
                />
                    
                : null
                }
                <TextControl
                label={__('Start At Desktop')}
                onChange={onChangeStartDesktop} 
                value={start_at_desktop}
                placeholder={__('start at desktop eg.2')}
                />
                <TextControl
                label={__('Desktop Quantity')}
                onChange={onChangeQtyDesktop} 
                value={qty_desktop}
                placeholder={__('desktop quantity')}
                />
                <TextControl
                label={__('Start At Mobile')}
                onChange={onChangeStartMobile} 
                value={start_at_mobile}
                placeholder={__('start at mobile eg.2')}
                />
                <TextControl
                label={__('Mobile Quantity')}
                onChange={onChangeQtyMobile} 
                value={qty_mobile}
                placeholder={__('mobile quantity')}
                />
                <TextControl
                label={__('Enter Tag Sticker')}
                onChange={onChangeTagSticker} 
                value={tag_sticker}
                placeholder={__('Enter Tag Sticker. Like Our Choice, HOT1, HOT2 etc.')}
                />
                
                <div className="components-base-control">
                <label className="components-base-control__label">Check All Casino?</label>    
                <FormToggle 
                    checked={check_all_casino}
                    onChange={onChangeChekAll}        
                />
                    </div>
                {
                    (check_all_casino)? <TextControl
                 label={__('View All Casino Text')}
                 onChange={onChangeCheckAllCasinoText} 
                 value={check_all_casino_text}
                 placeholder={__('Please enter casino listing button text')}
                 /> : null
                }  
                                 
                {
                (check_all_casino)? <TextControl
                 label={__('Check All Casino Url')}
                 onChange={onChangeCasinoUrl} 
                 value={all_casino_url}
                 placeholder={__('Please enter casino listing url')}
                 /> : null 
                }
                                    
                <SelectControl
                label="Show Load More"
                value={ show_load_more }
                options={ [
                {label: 'No', value: 'no' },
                { label: 'Yes', value: 'yes' },                            
                ] }
                onChange={onChangeLoadMore} 
                />
                
                {
                (show_load_more=='yes')? 
                <TextControl
                label={__('Load More Quantity')}
                onChange={onChangeLoadMoreQty} 
                value={load_more_qty}
                placeholder={__('enter loadmore quantity')}
                /> : null
                }
                {
                (show_load_more=='yes')? <TextControl
                 label={__('Load More Button Text')}
                 onChange={onChangeLoadMoreText} 
                 value={load_more_text}
                 placeholder={__('Load more button text')}
                 /> : null
                }
                <SelectControl
                    label="Do you want to show supported casino"
                    value={ show_supported_casino }
                    options={ [
                    {label: 'No', value: 'no' },
                    { label: 'Yes', value: 'yes' },                            
                    ] }
                    onChange={onChangeShowSupportedCasino} 
                    />
                
               {
                (show_supported_casino == 'yes')?
                <SelectControl
                label="Supported casino For"
                value={ supported_casino }
                options={ [
                            {label: '--choose one--', value: '' },
                { label: 'Software Provider', value: 'software_provider' },
                { label: 'Payment Methods', value: 'payment_method' },    
            
                ] }
                onChange={onChangeSupportedCasino} 
                />
                :
                null
               }
               { 
               
               ((typeof supported_casino !== "undefined" || supported_casino != '') && show_supported_casino == 'yes')?
               (supported_casino == 'software_provider')? 
               <TextControl
                label={__('Software ID')}
                onChange={onChangeSoftwareId} 
                value={software_id}
                placeholder={__('Software ID')}
                />
               :
               (supported_casino == 'payment_method')?
                <TextControl
                label={__('Payment Options ID')}
                onChange={onChangePaymentId} 
                value={payment_id}
                placeholder={__('Payment Options ID')}
                />
               :
               null
               :
               null
                 
                }
                
                <SelectControl
                    label="Show Terms And Conditions"
                    value={ show_terms }
                    options={ [
                    {label: 'No', value: 'no' },
                    { label: 'Yes', value: 'yes' },                            
                    ] }
                    onChange={onChangeShowTerms} 
                />
                {
                (show_terms == 'yes')?
                <div>
                <TextControl
                 label={__('Term and conditions link text')}
                 onChange={onChangeTermText} 
                 value={term_text}
                 placeholder={__('Term text')}
                 />
                 
                 <TextControl
                 label={__('Term Separator')}
                 onChange={onChangeTermSeparator} 
                 value={term_separator}
                 placeholder={__('Separator like "•","#" etc')}
                 />
                
                </div>:
                    null 
                    }
                        {
                        (style == 'rows' || style == 'rows-with-serial' || style == '' )?
                        <div className="components-base-control">
                        <label className="components-base-control__label">Enable free text row for partners?</label>    
                        <FormToggle 
                            checked={enable_free_text_row}
                            onChange={onChangeFreetext}        
                        />
                        </div>
						: null
                        }
                        { ((style == 'rows' || style == 'rows-with-serial') && enable_free_text_row)?
						<div className="info-wrap">{infoList(info)}</div>:null
						}
						{ ((style == 'rows' || style == 'rows-with-serial') && enable_free_text_row)?
						<Button className="add-more-button" onClick={title => {
							setAttributes({
								info: [...info, {
									index: info.length,
									partner_id: bindPartnerData[0].value,
									text:'',
								}]
							});
						}}>Add Partner Text</Button>:null
                        }
                        {
                        ((style == 'rows' || style == 'rows-with-serial') && enable_free_text_row)?
                        <div className="components-base-control">
                        <label className="components-base-control__label">Enable show more for desktop?</label>    
                        <FormToggle 
                            checked={show_more_desktop}
                            onChange={onChangeShowMoreDesktop}        
                        />
                        </div>
						: null
                        }
                        {
                        ((style == 'rows' || style == 'rows-with-serial') && enable_free_text_row)?
                        <div className="components-base-control">
                        <label className="components-base-control__label">Enable show more for mobile?</label>    
                        <FormToggle 
                            checked={show_more_mobile}
                            onChange={onChangeShowMoreMobile}        
                        />
                        </div>
						: null
						}
                </div>
                    ]
                },
                save: (props) => {
                    return ( 
                        <div className="img-upload-wrapper-bg">
                           <div className="thumbnail">
                               <img 
                               src={props.attributes.imgURL} 
                               alt={props.attributes.imgAlt}
                               />
                           </div>          
                        </div>,
                        <div className="img-upload-wrapper-side">
                           <div className="thumbnail">
                               <img 
                               src={props.attributes.sideImgURL} 
                               alt={props.attributes.sideImgAlt}
                               />
                           </div>          
                        </div>
                    )
                 },
                })

