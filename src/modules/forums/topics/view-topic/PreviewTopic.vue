/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/18/2017.
 * (C) BIT TECHNOLOGIES
 */

<template>

    <tr>
        <td :key="'TopicTable_'+topic.id" class="anchor">

            <Voting :parentId = "topic.id" :showPreview="this.showPreview" />

            <div>
                <div class="anchor" style='padding-left: 42px' >

                    <div class="col-md-8">
                        <img v-if="getTopicImage.img !== ''" class="table-forums-topic-image" :src="getTopicImage.img" :alt="getTopicTitle" />

                        <router-link :to="'/'+topic.URL+'#top'" :disableLink="this.showPreview" >
                            <h4 class="table-forums-topic-title" v-html="getTopicTitle"></h4>
                        </router-link>
                        <div>
                            <h2><b>{{this.getPrice}}</b></h2>
                            <h3>
                                <CryptoPrice :fiatValue="this.topic.price.price" :fiatCurrency="this.topic.price.currency" cryptoCurrency="BTC" :productId="this.topic.id" />
                            </h3>

                            <h4 v-if="(this.topic.price.youSave||'') != ''">{{this.topic.price.listPrice||''}} saving {{this.topic.price.youSave||''}}</h4>
                            <h4 v-if="(this.topic.price.watching||'') != ''">watching {{this.topic.price.watching||''}}</h4>
                            <h3 v-if="(this.topic.price.quantitySold||'') != ''">sold {{this.topic.price.quantitySold||''}}</h3>
                            <h4 v-if="(this.topic.price.quantityAvailable||'') != ''">{{this.topic.price.quantityAvailable||''}}</h4>
                        </div>


                        <div v-if="(this.viewMore === true) && (this.showPreview === true) && (this.previewStatus)">

                            <router-link :to="'/'+topic.URL" :disableLink="this.showPreview" >
                                <div class="table-forums-topic-body word-wrap" v-html="this.getShortDescription">
                                </div>
                            </router-link>

                            <a type="button" class="btn btn-default btn-xs btn-rounded view-more" @click="enablePreviewStatus(false)">
                                ... View More
                            </a>
                        </div>

                        <div v-if="(this.viewMore === false) || ((this.viewMore === true) && (this.showPreview === false)) || ((this.viewMore === true) && (this.showPreview === true)  && (this.previewStatus === false))">

                            <router-link :to="'/'+topic.URL" :disableLink="this.showPreview" >
                                <div class="table-forums-topic-body word-wrap" v-html="this.getDescription" >
                                </div>
                            </router-link>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <ViewUserForum style='display: inline' :authorId="topic.authorId" :additionalInformation="topic.addInfo" :authorInfo="topic.authorInfo">

                            <ShowDate :date="topic.addInfo.dtRealCreation||topic.dtCreation" slot="view-user-bottom"/>

                        </ViewUserForum>
                    </div>



                </div>

                <div class="clearfix" />




                <br />

                <div class="topic-question-footer" v-if="!this.showTablePreview">
                    <ContentButtonsInline  buttonsRowStyle="paddingBottom: 10px" :parentId="this.topic.id" :parentName="this.topic.title" :isOwner="this.$store.state.authenticatedUser.user , this.topic | checkOwner" parentReplyId="" parentReplyName=""/>
                </div>

                <div class="clearfix" />

            </div>

            <ViewAllReplies style="padding-left: 40px; padding-bottom: 20px;"

                    :parentId = "this.topic.id"
                    parentReplyId = ""
                    :key = "'ViewReplies_'+this.topic.id+'_'"

                    :showPreview = "this.showPreview"

            >
            </ViewAllReplies>

        </td>
    </tr>

</template>




<script>

    import {checkOwner} from 'modules/utils/global-utilities/UtilitiesFunctions';

    import Topic from 'models/Topic/Topic.model';

    import ShowDate from 'client/components/util-components/UI/show-date/ShowDate.component.vue';
    import Voting from  'modules/forums/voting/Voting.component.vue'
    import ViewAllReplies from  'modules/forums/replies/view-reply/ViewAllReplies.vue'
    import ContentButtonsInline from 'modules/forums/components/ContentButtonsInline.component.vue';

    import ViewUserForum from 'modules/users/view-users/ViewUserForum.component.vue';
    import {sanitizeAdvanced, sanitizeAdvancedShortDescription} from 'modules/utils/global-utilities/SanitizeAdvanced';

    import Attachments from 'models/Attachment/Attachments.model'
    import CryptoPrice from 'modules/crypto/crypto-price/CryptoPrice.component.vue'

    export default{

        name: '',

        components: {
            'ShowDate' : ShowDate,
            'ContentButtonsInline' : ContentButtonsInline,
            'Voting': Voting,
            'ViewAllReplies': ViewAllReplies,
            'ViewUserForum' : ViewUserForum,
            'CryptoPrice': CryptoPrice,
        },

        props:{
            topic:  {default: null},
            showPreview: {default: false},
            showTablePreview: {default: false},
        },

        data: function () {
            return {
                previewStatus: true,
            }
        },

        mounted: function () {
            this.$store.dispatch('CONTENT_USERS_GET', {userId: this.topic.authorId})
        },

        computed: {
            getTopicImage(){
                return Attachments.getImage(this.topic) || "";
            },

            getTopicTitle(){
                return Attachments.getTitle(this.topic)||'no title';
            },

            getDescription(){
                return sanitizeAdvanced(Attachments.getDescription(this.topic)||'',false);
            },

            getShortDescription(){
                return sanitizeAdvancedShortDescription(Attachments.getShortDescription(this.topic)||'', 512, false);
            },

            getPrice(){
                return (this.topic.price.currency||'')+" "+ (this.topic.price.price||'')
            },

            viewMore(){
                return this.topic.viewMore;
            },

        },

        methods:{
            enablePreviewStatus(newStatus){
                this.previewStatus = newStatus;
            }
        }

    }

</script>
