/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/25/2017.
 * (C) BIT TECHNOLOGIES
 */


<template>

    <div>
        <HeaderCover  v-if=" (getTopic !== null) && (getTopicRouter.notFound === false)"
                      :title="getTopic.title||''"
                      :subTitle="' '"
                      :icon="getParentForum.iconPic||''"
                      :cover="getTopic.coverPic||getParentForum.coverPic||''"
                      :coverColor="getParentForum.coverColor||''"
                      :breadcrumbs="getTopic.breadcrumbs||[]"
                      :url="getTopic.URL"

                      :enableChangeIcon = "getParentForum.isOwner"
                      :enableChangeCover = "getParentForum.isOwner"

                      :buttons="[{class:'btn-danger', style:'width: 100%;', text:'delete',icon:'fa fa-times', onClick:handleDeleteTopicButtonClick}]"
        />

        <WebsiteHeaderCover v-else />


        <div  class='anchor col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 col-xs-offset-0 col-tn-12 col-tn-offset-0'  style="padding-bottom: 30px" >


            <div style='position: relative; z-index: 2 '>

                <div v-if="(getTopicRouter.notFound === false)&&(getTopic !== null)">

                    <div class="topic-question" >

                        <ShowDate className="date information" :date="getTopic.addInfo.dtRealCreation||getTopic.dtCreation" />
                        <!--
                        <span class="views information" data-toggle="tooltip" data-placement="left" title="" data-original-title="Views 468"><i class="fa fa-eye"></i> 468</span>
                        <span class="unique-views information" data-toggle="tooltip" data-placement="left" title="" data-original-title="Unique Views 216"><i class="fa fa-eye-slash"></i> 216</span>
                        -->

                        <!-- HEADER -->

                        <div class="row form-head-line">

                            <Voting :parentId = "getTopic.id" />

                            <ViewUserForum :authorId="getTopic.authorId" :additionalInformation="getTopic.addInfo" :authorInfo="getTopic.authorInfo">
                                <h3 class="reply-header-title" style="font-size: 22px"  slot="view-user-after-profile-pic">{{getTopic.title || '' }} </h3>
                            </ViewUserForum>

                        </div>

                        <!-- CONTENT -->

                        <div :id="getTopic.id" class="articleContent anchor" style="display: inline">
                            <div class="container-fluid topic-question-body">


                                <a v-if="getImage.img !==''" :href="getImage">
                                    <img :src="getImage.img" :alt="getTitle" class="topic-question-image" />
                                </a>

                                <div v-if="(this.viewMore === true) && (this.showPreview === true) && (this.previewStatus)">
                                    <p >
                                        <div v-html="this.getShortDescription" />

                                        <a class="btn btn-default btn-xs btn-rounded view-more" @click="enablePreviewStatus(false)">
                                            ... View More
                                        </a>
                                    </p>
                                </div>


                                <div style="text-align: right">
                                    <h2>{{this.getPrice}}</h2>

                                    <ServerTimerCountDown />
                                    <AltcoinsPrice :fiatValue="this.getTopic.price.price" :fiatCurrency="this.getTopic.price.currency" altcoinCurrency="btc" />

                                    <br/>
                                    <h3 v-if="(this.getTopic.price.youSave||'') != ''">{{this.getTopic.price.listPrice||''}} saving {{this.getTopic.price.youSave||''}}</h3>
                                    <h4 v-if="(this.getTopic.price.watching||'') != ''">watching {{this.getTopic.price.watching||''}}</h4>
                                    <h3 v-if="(this.getTopic.price.quantitySold||'') != ''">sold {{this.getTopic.price.quantitySold||''}}</h3>
                                    <h4 v-if="(this.getTopic.price.quantityAvailable||'') != ''">{{this.getTopic.price.quantityAvailable||''}}</h4>
                                </div>


                                <div v-if="(this.viewMore === false) || ((this.viewMore === true) && (this.showPreview === false)) || ((this.viewMore === true) && (this.showPreview === true)  && (this.previewStatus === false))">
                                    <p>
                                        <div v-html="this.getDescription" />

                                    </p>
                                </div>

                            </div>
                        </div>

                        <div class="clearfix" />

                        <!-- FOOTER -->

                        <div class="topic-question-footer" style="display: inline;">

                            <div v-if="(Array.isArray(getTopic.attachments))&&(getTopic.attachments.length > 0)">
                                <DisplayAttachments :attachments="getTopic.attachments||[]" />
                            </div>


                            <div class="topic-question-footer-buttons">
                                <ContentButtonsInline  buttonsRowStyle="paddingBottom: 10px" :parentId="this.getTopic.id" :parentName="this.getTopic.title" :isOwner="this.$store.state.authenticatedUser.user , this.getTopic | checkOwner " parentReplyId="" parentReplyName=""/>
                            </div>

                            <!--
                            <div class="col-xs-12 col-sm-7 topic-question-footer-later-edit" style={{textAlign: "right"}}>
                                <ShowDate date={this.props.topic.object.dtCreation} />
                                by <i class="glyphicon glyphicon-user"></i> <span> <a href="http://skyhub.me/profile\admin">Alexandru Ionut Budisteanu</a> </span>
                            </div>
                            -->
                        </div>

                    </div>

                </div>
                <div v-else> <!-- ERROR -->
                    <div class="row">
                        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                            <div class="alert alert-danger ">
                                <h4 style='textAlign: center;'>Topic <strong>NOT Found</strong></h4>
                                <strong>{{this.$store.state.route.fullPath||"/"}}</strong> was not found. Probably what you've been looking for doesn't exists or has been deleted in the mean while.
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <DisplayTopicContent />

            <ViewAllReplies

                    :parentId = "this.getTopic.id"
                    parentReplyId = ""
                    :key = "'ViewReplies_'+this.getTopic.id+'_'"
                    :showPreview="false"

                    :reverse = "this.getTopic.addInfo.scraped||false"

            >
            </ViewAllReplies>

        </div>

    </div>
</template>


<script>

    import HeaderCover from 'client/components/Template/Template-components/Header/Cover/HeaderCover.component.vue';
    import ShowDate from 'client/components/util-components/UI/show-date/ShowDate.component.vue';
    import DisplayTopicContent from 'modules/forums/topics/view-topic/DisplayTopicContent.vue';

    import ContentButtonsInline from 'modules/forums/components/ContentButtonsInline.component.vue';
    import DisplayAttachments from 'modules/attachments/view-attachments/DisplayAttachments.vue';

    import ViewAllReplies from  'modules/forums/replies/view-reply/ViewAllReplies.vue'
    import Voting from  'modules/forums/voting/Voting.component.vue'
    import ViewUserForum from 'modules/users/view-users/ViewUserForum.component.vue';

    import Topic from 'models/Topic/Topic.model';
    import Attachments from 'models/Attachment/Attachments.model'

    import ServerTimerCountDown from 'client/components/util-components/UI/timer-count-down/ServerTimerCountDown.component.vue'
    import AltcoinsPrice from 'client/components/util-components/UI/altcoins-price/AltcoinsPrice.component.vue'

    export default{

        name: 'ViewTopic',

        components:{
            'HeaderCover' : HeaderCover,
            'DisplayTopicContent' : DisplayTopicContent,
            'ShowDate' : ShowDate,
            'ContentButtonsInline':ContentButtonsInline,
            'DisplayAttachments': DisplayAttachments,
            'ViewAllReplies': ViewAllReplies,
            'Voting' : Voting,
            'ViewUserForum': ViewUserForum,
            'ServerTimerCountDown': ServerTimerCountDown,
            'AltcoinsPrice': AltcoinsPrice,
        },

        props: {
            showPreview : {default: false},
        },

        data: function () {
            return {
                previewStatus: true,
            }
        },

        computed:{

            getTopicRouter(){
                return this.$store.state.content.contentRouter.currentObject;
            },

            getParentForumRouter(){
                return this.$store.state.content.contentRouter.parentObject;
            },

            getTopic(){
                return this.getTopicRouter.object;
            },

            getParentForum(){
                return this.getTopicRouter.object;
            },

            getTitle(){
                return Attachments.getTitle(this.getTopic)||'no title';
            },

            getImage(){
                return Attachments.getImage(this.getTopic)||'';
            },

            getDescription(){
                return Attachments.getDescription(this.getTopic)||'';
            },

            getPrice(){
                return (this.getTopic.price.currency||'')+" "+ (this.getTopic.price.price||'')
            },

            getShortDescription(){
                return Attachments.getShortDescription(this.getTopic)||'';
            },

            viewMore(){
                return this.getTopic.viewMore;
            },

        },

        methods:{
            enablePreviewStatus(newStatus){
                this.previewStatus = newStatus;
            },

            handleDeleteTopicButtonClick(){

                if (this.$store.state.global.refModal !== null) {
                    this.$store.state.global.refModal.showAlert("Are you sure you want to delete the topic?",'','Do you want to delete the topic?  <br/> <br/> <strong>'+(this.getTopicRouter.object.title||'')+'</strong>',
                        [
                            {className: 'btn-primary', closable: true, text: 'Cancel'},
                            {className: 'btn-danger', closable: false, text: 'Yes', onClick: this.handleDeleteTopic}
                        ]);
                }

            },

            async handleDeleteTopic(){

                let url = '/';
                if (this.getParentForumRouter.object !== null)
                    url =  this.getParentForumRouter.object.URL;

                let answer = await this.$store.dispatch('CONTENT_DELETE_OBJECT', { objectId: this.getTopicRouter.object.id } );

                if (answer.result === true){

                    this.$store.state.global.refModal.closeModal();

                    this.$router.push(url);  // redirecting to the parent URL ;)

                } else {
                    this.$store.state.global.refModal.setError(answer.message);
                }

            },
        }

    }
</script>