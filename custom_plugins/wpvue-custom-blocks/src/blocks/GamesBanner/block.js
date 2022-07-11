/**
 * BLOCK: Free Games List
 *
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

//  Import CSS.
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { TextControl,TextareaControl,Button,SelectControl,FormToggle,PanelBody } = wp.components
const { MediaUpload,InspectorControls } = wp.blockEditor


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

registerBlockType('wpvue/games-banner', {
    title: __( 'Games Banner' ),
    icon: 'format-aside', 
    category: 'CasinoPages',
    keywords: [
      __( 'Software Providers' ),
    ],
    supports: {
       html: false,
       reusable: false,
       align: false
    },
    attributes: {
        title: {
            type: 'string',
        },
        subtitle: {
            type: 'string',
        },
        notrecommendedtext: {
            type: 'string',
        },
        titleSecond: {
            type: 'string',
        },
        block_id: {
            type: 'string',
        },
        content: {
            type: 'string',
        },
        reviewerName: {
            type: 'string',
        },
        reviewDate: {
            type: 'string',
        },
        reviewContent: {
            type: 'string',
        },
        bgImgURL: {
            type: 'string',
        },
        bgImgID:{
           type:'number'
        }, 
        bgImgAlt:{
           type:'string',
           source:'attribute',
           attribute:'alt',
           selector:'img'
        },
        withdrawRating: {
            type: 'string',
        },
        softwareRating: {
            type: 'string',
        },
        mobileRating: {
            type: 'string',
        },
        qty: {
            type: 'string',

        },
        group_id: {
            type: 'string',
        },
        main_partner_id: {
            type: 'string',
        },
        first_partner_id: {
            type: 'string',
        },
        second_partner_id: {
            type: 'string',
        },
        reviewImgURL: {
            type: 'string',
        },
        reviewImgID:{
           type:'number'
        }, 
        reviewImgAlt:{
           type:'string',
           source:'attribute',
           attribute:'alt',
           selector:'img'
        },
        tag_sticker:{
            type: 'string',
        },
        style: {
            type: 'string',
            default:'games-card-view'
        },
      },


    edit: props => {
        var title = props.attributes.title;
        var subtitle = props.attributes.subtitle;
        var notrecommendedtext = props.attributes.notrecommendedtext;
        var titleSecond = props.attributes.titleSecond;
        var content = props.attributes.content;
        var reviewerName = props.attributes.reviewerName;
        var reviewContent = props.attributes.reviewContent;
        var reviewDate = props.attributes.reviewDate;
        var block_id = props.attributes.block_id;
        var group_id = props.attributes.group_id;
        var main_partner_id = props.attributes.main_partner_id;
        var first_partner_id = props.attributes.first_partner_id;
        var second_partner_id = props.attributes.second_partner_id;
        var withdrawRating = props.attributes.withdrawRating;
        var softwareRating = props.attributes.softwareRating;
        var mobileRating = props.attributes.mobileRating;
        var tag_sticker = props.attributes.tag_sticker;
        var style = props.attributes.style;

        var onChangeTitle = function( content ) {
            props.setAttributes({title: content})
        }
        var onChangeSubTitle = function( content ) {
            props.setAttributes({subtitle: content})
        }
        var onChangeNotRecommendedText = function( content ) {
            props.setAttributes({notrecommendedtext: content})
        }
        var onChangeSecondTitle = function( content ) {
            props.setAttributes({titleSecond: content})
        }
        var onChangeContent = function onChangeContent ( content ) {
            props.setAttributes({content: content})
        }  
        var onChangeReviewerName = function onChangeReviewerName ( content ) {
            props.setAttributes({reviewerName: content})
        } 
        var onChangeReviewContent = function onChangeReviewContent ( content ) {
            props.setAttributes({reviewContent: content})
        }
        var onChangeReviewDate = function onChangeReviewDate ( content ) {
            props.setAttributes({reviewDate: content})
        } 
        var onChangeBlockId = function onChangeBlockId(content) {
            props.setAttributes({block_id: content});
        } 
        var onChangeQty = function onChangeQty(content) {
            props.setAttributes({qty: content})
        }
        var onChangeGroupId = function onChangeGroupId(content) {
            props.setAttributes({group_id: content})
        }
        var onChangeMainId = function onChangeMainId(content) {
            props.setAttributes({main_partner_id: content})
        }
        var onChangeFirstId = function onChangeFirstId(content) {
            props.setAttributes({first_partner_id: content})
        }
        var onChangeSecondId = function onChangeSecondId(content) {
            props.setAttributes({second_partner_id: content})
        }
        var onChangeTagSticker = function (content) {
            props.setAttributes({tag_sticker: content});
        };
        const onBgImgSelect = (img)=>{
            props.setAttributes({
              bgImgID : img.id,
              bgImgAlt: img.alt,
            });
            props.setAttributes({bgImgURL: img.url});  
              //console.log('It is working!');
        }
        const onRemovebgImg = () => {
            props.setAttributes({
              bgImgURL :  null,
              bgImgID : null,
              bgImgAlt: null
            });
        }
        const onReviewImgSelect = (img)=>{
            props.setAttributes({
              reviewImgID : img.id,
              reviewImgAlt: img.alt
            });
            props.setAttributes({reviewImgURL: img.url});  
              //console.log('It is working!');
        }
        const onRemoveReviewImg = () => {
            props.setAttributes({
              reviewImgURL :  null,
              reviewImgID : null,
              reviewImgAlt: null
            });
        }
        var onChangeStyle = function (content) {
            props.setAttributes({style: content});
        };

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
            <div id="block-payment-options" >
                <div className="block-header">Games banner</div>
               <TextControl
                   label="Title"
                   onChange={onChangeTitle}
                   value={title}
                   placeholder="Title"
               />
              <TextareaControl
                   label="content"
                   onChange={onChangeContent}
                   value={content}
                   placeholder="Content"
               />
               <SelectControl
                label="Style"
                value={ style }
                options={ [
                { label: 'Games Card View', value: 'games-card-view' },
                { label: 'Games Card with Review', value: 'games-card-review' },
                { label: 'Review Banner (For Not Recommended Message)', value: 'review-banner-not-recommended' },
                ] }
                onChange={onChangeStyle} 
                />
                {                
                (style=='review-banner-not-recommended') ? 
                <TextControl
                   label="Sub Title"
                   onChange={onChangeSubTitle}
                   value={subtitle}
                   placeholder="Sub Title"
               />
                :null
                }
                {                
                (style=='review-banner-not-recommended') ? 
                <TextControl
                   label="Not Recommended Text"
                   onChange={onChangeNotRecommendedText}
                   value={notrecommendedtext}
                   placeholder="Not Recommended Text"
               />
                :null
                }
                <TextControl
                   label={__('Group Id')}
                   onChange={onChangeGroupId} 
                   value={group_id}
                   placeholder={__('Group Id')}
               />
               <TextControl
                   label={__('Main partner Id')}
                   onChange={onChangeMainId} 
                   value={main_partner_id}
                   placeholder={__('Main partner Id')}
               />
               {                
                (props.attributes.bgImgURL) ? 
                <div className="img-upload-bg">
                <div className={ props.className }>
                    <img 
                    src={props.attributes.bgImgURL} 
                    alt={props.attributes.bgImgAlt}
                    />
                </div>
                    {(props.isSelected)?( <Button className="button button-primary" onClick={onRemovebgImg}>Remove image</Button> ):null}
                </div>
                    
                : <MediaUpload 
                onSelect={onBgImgSelect}
                value={props.attributes.bgImgID}
                render={({open})=>
                <Button
                onClick={open}
                className="button button-primary"
                >
                Background Image
                </Button>
                }
                />
                }
            {                
            (style=='games-card-review') ? 
              <SelectControl
                  label="Withdrawal limit review"
                  value={ withdrawRating }
                  options={ [
                      { label: '0.5', value: '0.5' },
                      { label: '1.0', value: '1.0' },
                      { label: '1.5', value: '1.5' },
                      { label: '2.0', value: '2.0' },
                      { label: '2.5', value: '2.5' },
                      { label: '3.0', value: '3.0' },
                      { label: '3.5', value: '3.5' },
                      { label: '4.0', value: '4.0' },
                      { label: '4.5', value: '4.5' },
                      { label: '5.0', value: '5.0' },
                  ] }
                  onChange={ ( withdrawRating ) => props.setAttributes( { withdrawRating: withdrawRating } ) }
              />:null
            }
            {                
            (style=='games-card-review') ? 
              <SelectControl
                  label="Software providers review"
                  value={ softwareRating }
                  options={ [
                      { label: '0.5', value: '0.5' },
                      { label: '1.0', value: '1.0' },
                      { label: '1.5', value: '1.5' },
                      { label: '2.0', value: '2.0' },
                      { label: '2.5', value: '2.5' },
                      { label: '3.0', value: '3.0' },
                      { label: '3.5', value: '3.5' },
                      { label: '4.0', value: '4.0' },
                      { label: '4.5', value: '4.5' },
                      { label: '5.0', value: '5.0' },
                  ] }
                  onChange={ ( softwareRating ) => props.setAttributes( { softwareRating: softwareRating } ) }
              />:null
            }
            {                
            (style=='games-card-review') ? 
              <SelectControl
                  label="Mobile friendly review"
                  value={ mobileRating }
                  options={ [
                      { label: '0.5', value: '0.5' },
                      { label: '1.0', value: '1.0' },
                      { label: '1.5', value: '1.5' },
                      { label: '2.0', value: '2.0' },
                      { label: '2.5', value: '2.5' },
                      { label: '3.0', value: '3.0' },
                      { label: '3.5', value: '3.5' },
                      { label: '4.0', value: '4.0' },
                      { label: '4.5', value: '4.5' },
                      { label: '5.0', value: '5.0' },
                  ] }
                  onChange={ ( mobileRating ) => props.setAttributes( { mobileRating: mobileRating } ) }
              />:null
            }
            {                
            (style=='games-card-review') ? 
                <TextControl
                   label="Reviewer Name"
                   onChange={onChangeReviewerName}
                   value={reviewerName}
                   placeholder="Reviewer Name"
               />:null
            }
            {                
            (style=='games-card-review') ? 
               <TextControl
                   label={__('Review date')}
                   onChange={onChangeReviewDate} 
                   value={reviewDate}
                   placeholder={__('Review date')}
               />:null
            }
            {                
            (style=='games-card-review') ? 
                <TextareaControl
                   label="Review Content"
                   onChange={onChangeReviewContent}
                   value={reviewContent}
                   placeholder="Review Content"
               />:null
            }
               {                
                (style=='games-card-review') ?                 
                (props.attributes.reviewImgURL) ? 
                <div className="img-upload-review">
                <div className={ props.className }>
                    <img 
                    src={props.attributes.reviewImgURL} 
                    alt={props.attributes.reviewImgAlt}
                    />
                </div>
                    {(props.isSelected)?( <Button className="button button-primary" onClick={onRemoveReviewImg}>Remove image</Button> ):null}
                </div>
                    
                : <MediaUpload 
                onSelect={onReviewImgSelect}
                value={props.attributes.reviewImgID}
                render={({open})=>
                <Button
                onClick={open}
                className="button button-primary"
                >
                Reviewer Image
                </Button>
                }
                />:null
                }
            {                
                (style=='games-card-review') ?
               <TextControl
                   label="Second title"
                   onChange={onChangeSecondTitle}
                   value={titleSecond}
                   placeholder="Second Title"
               />:null
            }
               <TextControl
                   label={__('First partner Id')}
                   onChange={onChangeFirstId} 
                   value={first_partner_id}
                   placeholder={__('First partner Id')}
               />
               <TextControl
                   label={__('Second partner Id')}
                   onChange={onChangeSecondId} 
                   value={second_partner_id}
                   placeholder={__('Second partner Id')}
               />
                <TextControl
                    label={__('Enter Tag Sticker')}
                    onChange={onChangeTagSticker} 
                    value={tag_sticker}
                    placeholder={__('Enter Tag Sticker. Like Our Choice, HOT1, HOT2 etc.')}
                />
            </div>
        ]
     },

    save ( props ) {
        return ( 
            <div className="img-upload-wrapper-bg">
               <div className="thumbnail">
                   <img 
                   src={props.attributes.bgImgURL} 
                   alt={props.attributes.bgImgAlt}
                   />
               </div>          
            </div>,
            <div className="img-upload-wrapper-review">
               <div className="thumbnail">
                   <img 
                   src={props.attributes.reviewImgURL} 
                   alt={props.attributes.reviewImgAlt}
                   />
               </div>          
            </div>
        )
     },

})
