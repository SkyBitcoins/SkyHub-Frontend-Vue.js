<template>
    <li key="notificationMenu" class="dropdown">

        <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#" @click="this.openNotificationMenu">
            <i class="fa fa-bell"></i>
            <span v-if="unreadUserNotifications > 0" class="label label-warning">{{unreadUserNotifications}}</span>
        </a>

        <ul class="dropdown-menu dropdown-messages" style="padding: 0;">

            <div class="slim-scroll" >
                <NotificationItem
                        v-for="(notification, index) in notifications"
                        :notification="notification"
                        :key="notification.id"
                        :last="index === (notifications.length-1)"
                />
            </div>


            <li>
                <div class="text-center link-block" @click="markAllAsRead">
                    <i class="fa fa-envelope"></i> <strong> Mark All as read</strong>
                </div>
            </li>

        </ul>

    </li>
</template>

<script>

  import Notification from 'models/Notification/Notification.model';
  import NotificationItem from './NotificationItem.vue';

  export default {
      name: 'NotificationsMenu',

      components: {NotificationItem},

      computed: {
          unreadUserNotifications(){
              return this.$store.state.notifications.user.unreadNotifications;
          },

          notifications(){
              return this.$store.getters.getNotifications;
          }

      },

      methods:{
          markAllAsRead(){
              return this.$store.dispatch('USER_NOTIFICATIONS_MARK_READ', {notificationId:'', markRead:true, markAll:true});
          },

          resetNotificationsUnreadCounter(){
              return this.$store.dispatch('USER_NOTIFICATIONS_RESET_UNREAD_COUNTER', {});
          },

          openNotificationMenu(){
              this.resetNotificationsUnreadCounter();

              let notifications = this.notifications;
              for (let i=0; i<notifications.length; i++){

                  let userId = notifications[i].params.userSourceId||'';
                  if (userId !== ''){
                      this.$store.dispatch('CONTENT_USERS_GET', {userId: this.authorId});
                  }

              }
          },

          mounted(){

          },
      }

  }
</script>
