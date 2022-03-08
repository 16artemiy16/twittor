<script lang="ts">
import { Emit, Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
import AppModal from '~/components/app/AppModal.vue';
import TweetForm from '~/components/TweetForm.vue';

@Component({
  components: {
    AppModal,
    TweetForm,
  }
})
export default class TweetAddModal extends Vue {
  tweetModel: { body: string } = { body: '' };

  @Emit('send')
  send() {
    return this.tweetModel;
  }
}
</script>

<template>
  <AppModal
    headerText="New Tweet"
    @close="$emit('close')"
  >
    <TweetForm
      v-model="tweetModel"
      @on-send="send"
      class="pa-4"
    />
  </AppModal>
</template>
