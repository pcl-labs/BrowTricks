<template>
  <PageContentBoard>
    <div
      class="mx-auto pt-8 text-on-background text-opacity-high text-left max-w-2xl"
    >
      <div class="flex items-stretch px-2">
        <!-- description -->
        <div class="p-2 flex-grow break-word flex flex-col">
          <TextAreaInput
            class="flex-grow"
            v-model="$v.description.$model"
            :validatorModel="$v.description"
            label="Description"
            rows="8"
          >
            <p v-if="!$v.description.required">
              Description is required
            </p>
          </TextAreaInput>

          <div>
            <!-- chips -->
            <div class="flex items-center">
              <a
                @click.prevent="isOpenClientSelect = true"
                class="cursor-pointer"
                tabindex="0"
                aria-label="Select client"
                title="Select client"
              >
                <BaseChip>
                  <template #icon>
                    <IconCheck
                      v-if="selectedClientId"
                      class="fill-current text-on-surface w-3 h-3"
                    />
                    <IconUser
                      v-else
                      class="fill-current text-on-surface w-3 h-3"
                    />
                  </template>
                  {{ clientName }}
                </BaseChip>
              </a>

              <a
                tabindex="0"
                v-if="selectedClientId"
                title="Deselect Client"
                aria-label="Deselect Client"
                class="cursor-pointer select-none p-2 ml-4"
                @click="onDeselectClient"
                ><IconClose class="w-4 h-4"></IconClose
              ></a>
            </div>

            <p
              v-if="$v.selectedClientId.$error"
              class="text-error tg-body-mobile mt-2"
            >
              Client is required
            </p>
          </div>
        </div>
      </div>

      <Button
        title="Upload"
        @clicked="submit"
        background="bg-brand2"
        class="m-4"
      />

      <span class="m-4 tg-body-bold-mobile">
        Files that will be uploaded:
      </span>

      <!-- media -->
      <div class="p-2 flex flex-wrap items-center">
        <div
          v-for="(file, index) in files"
          :key="index"
          class="relative m-2 w-full sm:w-48"
        >
          <template v-if="file">
            <BaseImagePreview
              v-if="file.resourceType === 'image'"
              :file="{ ...file }"
              :selectFile="selectFile"
            />
            <BaseVideoPreview
              v-if="file.resourceType === 'video'"
              :selectFile="selectFile"
              :file="{
                ...file,
                thumbnail: getCloudinaryVideoThumbnail(file.url)
              }"
            />
            <a
              title="Delete"
              class="p-2 m-4 absolute bottom-0 right-0 bg-black bg-opacity-50 rounded-full cursor-pointer"
              @click.stop="remove(file)"
            >
              <DeleteIcon class="text-white w-6 h-6" />
            </a>
          </template>
        </div>
      </div>

      <template v-if="selectedFile">
        <ImagePreviewModal
          v-if="selectedFile.resourceType === 'image'"
          :file="selectedFile"
          @remove="remove"
          @close="selectFile(null)"
        />
        <VideoPreviewModal
          v-if="selectedFile.resourceType === 'video'"
          :file="selectedFile"
          @remove="remove"
          @close="selectFile(null)"
        />
      </template>

      <ClientSelectOverlay
        :tenantSlug="tenantSlug"
        :isOpen="isOpenClientSelect"
        @close="isOpenClientSelect = false"
        @select="onSelectClient"
        :selectedId="selectedClientId"
      />
    </div>
  </PageContentBoard>
</template>

<script>
import ClientSelectOverlay from '@/components/client/ClientSelectOverlay';
import PageContentBoard from '@/components/PageContentBoard';
import BaseImagePreview from '@/components/uploader/BaseImagePreview';
import BaseVideoPreview from '@/components/uploader/BaseVideoPreview';
import ImagePreviewModal from '@/components/uploader/ImagePreviewModal.vue';
import VideoPreviewModal from '@/components/uploader/VideoPreviewModal.vue';
import BaseChip from '@/components/BaseChip';
import IconUser from '@/assets/icons/person.svg';
import IconCheck from '@/assets/icons/check.svg';
import IconClose from '@/assets/icons/close.svg';
import DeleteIcon from '@/assets/icons/delete.svg';
import { mapGetters, mapActions } from 'vuex';
import {
  share,
  showOverlayAndRedirect,
  getCloudinaryVideoThumbnail
} from '@/helpers.js';

const clientTagRegex = /\s*@[\w]+-[\w]+\s*/g;

export default {
  name: 'ClientUpload',
  data: () => ({
    isOpenClientSelect: false,
    description: '',
    files: [],
    selectedFile: null,
    selectedClientId: undefined,
    clientName: 'Select client'
  }),
  validations: {
    selectedClientId: {},
    description: {}
  },
  created() {
    this.setDefaultSelectedClient();
  },
  computed: {
    ...mapGetters('uploader', ['uploadedFilesGet']),
    tenantSlug() {
      return this.$route.params.tenantSlug;
    }
  },
  components: {
    PageContentBoard,
    ClientSelectOverlay,
    ImagePreviewModal,
    VideoPreviewModal,
    IconUser,
    IconClose,
    IconCheck,
    BaseChip,
    BaseImagePreview,
    BaseVideoPreview,
    DeleteIcon
  },
  beforeMount() {
    this.checkUploadedFileExistance();
    this.openDrawerUploadUpdate(false);
  },
  methods: {
    ...mapActions('client', ['fetchClient', 'videoAdd', 'imageAdd']),
    ...mapActions('uploader', ['openDrawerUploadUpdate']),
    share,
    getCloudinaryVideoThumbnail,
    selectFile(file) {
      this.selectedFile = file;
    },
    remove(file) {
      console.log(file);
    },
    checkUploadedFileExistance() {
      if (!this.uploadedFilesGet[0]) {
        alert('No uploaded file.');
        this.$router.push({ name: 'TenantHome' });
        return;
      }
      this.files = this.uploadedFilesGet;
    },
    async setDefaultSelectedClient() {
      if (!this.$route.query.clientId) {
        return;
      }

      this.selectedClientId = this.$route.query.clientId;
      const client = await this._fetchClient(this.selectedClientId);
      this.onSelectClient(client);
    },
    async _fetchClient(clientId) {
      return await this.fetchClient({
        params: {
          clientId,
          tenantSlug: this.tenantSlug
        }
      }).catch(() => {
        console.log('Could not get client info.');
      });
    },
    replaceClientTag(text, client) {
      const found = text.match(clientTagRegex);
      let newTag = ' ';
      if (client) {
        newTag = ` @${client.firstName}-${client.lastName} `;
      }

      let result = text;
      if (found) {
        result = text.trim().replace(clientTagRegex, `${newTag}`);
      } else {
        result = text.trim() + `${newTag}`;
      }
      return result.trim();
    },
    onDeselectClient() {
      this.selectedClientId = undefined;
      this.clientName = 'Select client';
      this.description = this.replaceClientTag(this.description, undefined);
    },
    onSelectClient(client) {
      this.selectedClientId = client.id;
      this.clientName = `${client.firstName} ${client.lastName}`;
      this.description = this.replaceClientTag(this.description, client);
    },
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const media = this.uploadedFilesGet[0];
      /* eslint-disable */
      const method =
        media.resourceType === 'image'
          ? this.imageAdd
          : media.resourceType === 'video'
          ? this.videoAdd
          : null;
      /* eslint-enable */

      if (!method) {
        console.log('Unknown media type.');
        return;
      }
      method({
        params: {
          tenantSlug: this.tenantSlug,
          body: {
            clientId: this.selectedClientId,
            [media.resourceType]: media,
            description: this.description
          }
        }
      })
        .then(() => {
          /* eslint-disable */
          const route = this.selectedClientId
            ? {
                name: 'ClientInfo',
                params: { clientId: this.selectedClientId }
              }
            : { name: 'Account' };
          /* eslint-enable */
          showOverlayAndRedirect({
            title: 'Success!',
            route
          });
        })
        .catch(error => {
          console.log('Update client error', error.response);
        });
    }
  }
};
</script>
