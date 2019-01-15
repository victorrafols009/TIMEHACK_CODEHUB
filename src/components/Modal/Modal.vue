  <template>
  <div class="modal">
    <div class="modal__bg"/>
    <div class="modal__container">
      <div class="modal__container-header">
        <slot name="header"/>
      </div>
      <div class="modal__container-body">
        <slot name="body"/>
      </div>
      <div class="modal__container-footer">
        <button class="btn blue">
          Proceed
        </button>
        <button @click="$emit('hideModal')" class="btn ">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:
  {
    modal: Object,
  }
}
</script>

