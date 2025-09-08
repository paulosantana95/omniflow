<template>
  <q-list separator style="max-width: 370px" class="q-px-sm q-py-none q-pt-sm">
    <!-- :clickable="ticket.status !== 'pending' && (ticket.id !== $store.getters['ticketFocado'].id || $route.name !== 'chat')" -->
    <q-item
      clickable
      :style="`border-left: 6px solid ${
        borderColor[ticket.status]
      }; border-radius: 8px; min-height: 125px; height: auto;`"
      @click="
        () => {
          abrirChatContato(ticket);
          marcarComoLido(ticket);
        }
      "
      id="item-ticket-houve"
      class="ticketBorder q-px-sm q-py-sm"
      :class="{
        ticketBorderGrey: !$q.dark.isActive,
        'ticket-active-item': ticket.id === $store.getters['ticketFocado'].id,
        ticketNotAnswered:
          ticket.answered == false &&
          ticket.isGroup == false &&
          ticket.status == 'open',
      }"
    >
      <q-item-section avatar class="q-px-none">
        <q-btn
          flat
          @click="iniciarAtendimento(ticket)"
          push
          color="primary"
          dense
          round
          v-if="
            ticket.status === 'pending' ||
            (buscaTicket && ticket.status === 'pending')
          "
        >
          <q-badge
            v-if="ticket.unreadMessages"
            style="border-radius: 8px"
            class="text-center text-bold"
            floating
            dense
            text-color="white"
            color="red"
            :label="ticket.unreadMessages"
          />
          <q-avatar>
            <q-icon size="50px" name="mdi-account-arrow-right" />
            <!-- <q-icon size="18px"
            :name="`img:${ticket.channel}-logo.png`"
            class="absolute-top-right channel-icon" /> -->
          </q-avatar>
          <q-tooltip>
            {{ $t("atendimentoItemTicket.labels.atender") }}
          </q-tooltip>
        </q-btn>
        <q-avatar
          size="50px"
          v-if="ticket.status !== 'pending'"
          class="relative-position"
        >
          <q-badge
            v-if="ticket.unreadMessages"
            style="border-radius: 8px; z-index: 99"
            class="text-center text-bold"
            floating
            dense
            text-color="white"
            color="red"
            :label="ticket.unreadMessages"
          />
          <img
            :src="ticket.profilePicUrl"
            class="blur-effect"
            onerror="this.style.display='none'"
            @error="handleImageError(ticket)"
            v-show="ticket.profilePicUrl"
          />
          <q-icon size="50px" name="mdi-account-circle" color="grey-8" />
          <q-icon
            size="18px"
            :name="`img:${ticket.channel}-logo.png`"
            class="absolute-top-right channel-icon"
          />
        </q-avatar>
      </q-item-section>
      <q-item-section id="ListItemsTicket">
        <q-item-label class="text-bold blur-effect" lines="1">
          {{
            !ticket.name
              ? ticket?.contact?.name || "Sem Nome"
              : ticket?.name || "Sem Nome"
          }}
          <q-icon
            size="20px"
            v-if="
              ticket.status === 'pending' ||
              (buscaTicket && ticket.status === 'pending')
            "
            :name="`img:${ticket.channel}-logo.png`"
          />
        </q-item-label>
        <!-- Última mensagem sem truncamento -->
        <q-item-label lines="1" caption>
          {{ ticket.lastMessage }}
        </q-item-label>
        <!-- ID do ticket e hora lado a lado -->
        <q-item-label
          lines="1"
          caption
          class="row items-center justify-between"
        >
          <span>#{{ ticket.id }}</span>
          <q-badge
            dense
            transparent
            square
            :label="dataInWords(ticket.lastMessageAt, ticket.updatedAt)"
            :key="recalcularHora"
            text-color="grey-10"
            color="secondary"
          />
        </q-item-label>
        <!-- Badges das tags embaixo do ID -->
        <q-item-label
          v-if="tagsDoTicket.length > 0"
          lines="2"
          caption
          class="q-mt-xs"
        >
          <div
            class="row q-gutter-xs flex-wrap tags-container"
            style="margin-top: 1px"
          >
            <q-chip
              v-for="tag in tagsDoTicket"
              :key="tag.tag"
              :label="tag.tag"
              dense
              class="text-weight-medium tag-chip"
              style="font-size: 0.65rem; padding: 2px 6px; max-width: 80px"
              :style="{
                backgroundColor: tag.color,
                color: getContrastTextColor(tag.color),
              }"
              tabindex="0"
            >
              <q-tooltip>
                {{ tag.tag }}
              </q-tooltip>
            </q-chip>
          </div>
        </q-item-label>
        <q-item-label lines="1" caption>
          <q-icon
            v-for="wallet in walletsDoTicket"
            :key="wallet.wallet"
            name="mdi-wallet"
            size="1.4em"
            class="q-mb-sm"
          >
            <q-tooltip>
              {{ wallet.wallet }}
            </q-tooltip>
          </q-icon>
          <q-icon
            v-if="ticket.kanban"
            :key="ticket.kanban"
            name="mdi-developer-board"
            size="1.4em"
            class="q-mb-sm"
          >
            <q-tooltip>
              {{
                $t("atendimentoItemTicket.labels.kanban", {
                  kanbanName: ticket.kanban,
                })
              }}
            </q-tooltip>
          </q-icon>
          <!-- <span class="q-ml-sm text-bold" :style="{ color: (ticket.queue || obterNomeFila(ticket)) ? 'black' : '' }"
          :color="$q.dark.isActive ? 'blue-9' : 'blue-2'"
          > -->
          <span
            class="q-ml-sm text-bold"
            :style="{ color: $q.dark.isActive ? 'white' : 'black' }"
          >
            {{ `${ticket.queue || obterNomeFila(ticket) || ""}` }}
          </span>
          <!-- <span class="q-ml-sm text-bold" :style="{ color: 'black' }">
            Etiquetas:
          </span> -->
          <!-- <q-chip
            v-for="tag in tagsDoTicket" 
            :color="tag.color"
            :key="tag.tag" 
            dense
            square
            :label="tag && tag.tag"
            size="10px"
            class="q-mr-md text-bold" /> -->
          <span class="absolute-bottom-right">
            <q-icon
              v-if="ticket.status === 'closed'"
              name="mdi-check-circle-outline"
              color="positive"
              size="1.8em"
              class="q-mb-sm"
            >
              <q-tooltip>
                {{ $t("atendimentoItemTicket.labels.atendimentoResolvido") }}
              </q-tooltip>
            </q-icon>
            <q-icon
              v-if="
                (ticket.stepAutoReplyId &&
                  ticket.autoReplyId &&
                  ticket.status === 'pending') ||
                (ticket.chatFlowId &&
                  ticket.stepChatFlow &&
                  ticket.status === 'pending') ||
                (ticket.chatFlowId && ticket.status === 'pending')
              "
              name="mdi-robot"
              color="primary"
              size="1.8em"
              class="q-mb-sm"
            >
              <q-tooltip>
                {{ $t("atendimentoItemTicket.labels.chatbotAtendendo") }}
              </q-tooltip>
            </q-icon>
          </span>
        </q-item-label>
        <!-- Usuário e canal lado a lado -->
        <q-item-label class="row items-center justify-between" caption>
          <span>{{
            $t("atendimentoItemTicket.labels.usuario", {
              username: ticket.username || "",
            })
          }}</span>
          <q-chip
            :color="$q.dark.isActive ? '$primary' : 'blue-2'"
            dense
            square
            :label="ticket.whatsapp && ticket.whatsapp.name"
            size="10px"
            class="text-bold"
          />
        </q-item-label>
        <!-- <span class="absolute-bottom-right" v-if="ticket.unreadMessages">
          <q-badge style="font-size: .8em; border-radius: 8px;" class="q-py-xs" dense text-color="white" color="green" :label="ticket.unreadMessages" />
        </span> -->
      </q-item-section>
      <q-item-section avatar class="q-px-none">
        <q-btn
          flat
          @click="espiarAtendimentoPainel(ticket)"
          push
          color="primary"
          dense
          round
          v-if="
            !$q.screen.xs &&
            (ticket.status === 'pending' ||
              (buscaTicket && ticket.status === 'pending')) &&
            controlFeatures
          "
          class="q-mr-md"
        >
          <q-dialog v-model="isTicketModalOpen" @show="scrollToBottom">
            <q-card :style="cardStyle">
              <q-card-section class="row items-center justify-between">
                <div class="text-h6">
                  {{
                    $t("atendimentoItemTicket.labels.espiarAtendimento", {
                      id: currentTicket.id,
                    })
                  }}
                </div>
                <q-btn icon="close" flat round @click="closeModal" />
              </q-card-section>
              <q-card-section>
                <MensagemChat :mensagens="currentTicket.messages" />
              </q-card-section>
            </q-card>
          </q-dialog>
          <!-- <q-badge v-if="ticket.unreadMessages"
            style="border-radius: 8px;"
            class="text-center text-bold"
            floating
            dense
            text-color="black"
            color="blue-2"
            :label="ticket.unreadMessages" /> -->
          <q-avatar>
            <q-icon size="20px" name="mdi-eye-outline" />
          </q-avatar>
          <q-tooltip>
            {{ $t("atendimentoItemTicket.labels.espiar") }}
          </q-tooltip>
        </q-btn>

        <q-btn
          flat
          @click="espiarAtendimentoPainel(ticket)"
          push
          color="primary"
          dense
          round
          v-if="
            $q.screen.xs &&
            (ticket.status === 'pending' ||
              (buscaTicket && ticket.status === 'pending')) &&
            controlFeatures
          "
          class="q-mr-md"
        >
          <q-dialog v-model="isTicketModalOpen">
            <q-card :style="cardStyle">
              <q-card-section class="row items-center justify-between">
                <div class="text-h6">
                  {{
                    $t("atendimentoItemTicket.labels.espiarAtendimento", {
                      id: currentTicket.id,
                    })
                  }}
                </div>
                <!-- <div class="text-h6">{{ 'Espiar Atendimento: ' + currentTicket.id}}</div> -->
                <q-btn icon="close" flat round @click="closeModal" />
              </q-card-section>
              <q-card-section>
                <MensagemChat :mensagens="currentTicket.messages" />
              </q-card-section>
            </q-card>
          </q-dialog>
          <q-badge
            v-if="ticket.unreadMessages"
            style="border-radius: 8px"
            class="text-center text-bold"
            floating
            dense
            text-color="black"
            color="blue-2"
            :label="ticket.unreadMessages"
          />
          <q-avatar>
            <q-icon size="20px" name="mdi-eye-outline" />
          </q-avatar>
          <q-tooltip>
            {{ $t("atendimentoItemTicket.labels.espiar") }}
          </q-tooltip>
        </q-btn>

        <q-btn
          flat
          @click="fecharTicket(ticket)"
          push
          color="primary"
          dense
          round
          v-if="
            !$q.screen.xs &&
            (ticket.status === 'open' ||
              (buscaTicket && ticket.status === 'open')) &&
            controlFeatures
          "
          class="q-mr-md"
        >
          <q-avatar>
            <q-icon size="20px" name="mdi-close-circle-outline" />
          </q-avatar>
          <q-tooltip>
            {{ $t("atendimentoItemTicket.labels.fecharTicketSemDespedida") }}
          </q-tooltip>
        </q-btn>

        <q-btn
          flat
          @click="fecharTicket(ticket)"
          push
          color="primary"
          dense
          round
          v-if="
            $q.screen.xs &&
            (ticket.status === 'open' ||
              (buscaTicket && ticket.status === 'open')) &&
            controlFeatures
          "
          class="q-mr-md"
        >
          <q-avatar>
            <q-icon size="20px" name="mdi-close-circle-outline" />
          </q-avatar>
          <q-tooltip>
            {{ $t("atendimentoItemTicket.labels.forcarFechamento") }}
          </q-tooltip>
        </q-btn>

        <!-- <span class="absolute-bottom-right" v-if="ticket.unreadMessages">
          <q-badge style="font-size: .8em; border-radius: 8px;" class="q-py-xs" dense text-color="white" color="green" :label="ticket.unreadMessages" />
        </span> -->
      </q-item-section>
    </q-item>
    <!-- <q-separator color="grey-2"
      inset="item" /> -->
    <!-- <q-separator /> -->
  </q-list>
</template>

<script>
import { formatDistance, parseJSON } from "date-fns";
import pt from "date-fns/locale/pt-BR";
import mixinAtualizarStatusTicket from "./mixinAtualizarStatusTicket";
import { outlinedAccountCircle } from "@quasar/extras/material-icons-outlined";
// import { GetColorName } from 'hex-color-to-color-name';
import { ObterContato, RemoverFotoNula } from "src/service/contatos";
// import { ListarKanbans } from 'src/service/kanban'
import MensagemChat from "./MensagemChat.vue";
import whatsBackground from "src/assets/wa-background.png";
import { AtualizarTicketNaoLido } from "src/service/tickets";
import whatsBackgroundDark from "src/assets/wa-background-dark.jpg";

export default {
  name: "ItemTicket",
  mixins: [mixinAtualizarStatusTicket],
  components: {
    MensagemChat,
  },
  data() {
    return {
      controlFeatures: false,
      userProfile: "user",
      whatsBackground: whatsBackground,
      whatsBackgroundDark: whatsBackgroundDark,
      isTicketModalOpen: false,
      kanbans: [],
      currentTicket: {},
      tagsDoTicket: [],
      walletsDoTicket: [],
      // colorName: null,
      outlinedAccountCircle,
      recalcularHora: 1,
      statusAbreviado: {
        open: "A",
        pending: "P",
        closed: "R",
      },
      status: {
        open: this.$t("atendimentoItemTicket.status.aberto"),
        pending: this.$t("atendimentoItemTicket.status.pendente"),
        closed: this.$t("atendimentoItemTicket.status.resolvido"),
      },
      color: {
        open: "primary",
        pending: "negative",
        closed: "positive",
      },
      borderColor: {
        open: "primary",
        pending: "negative",
        closed: "positive",
      },
    };
  },
  props: {
    ticket: {
      type: Object,
      default: () => {},
    },
    buscaTicket: {
      type: Boolean,
      default: false,
    },
    filas: {
      type: Array,
      default: () => [],
    },
    etiquetas: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    cardStyle() {
      return {
        backgroundImage: this.$q.dark.isActive
          ? `url(${this.whatsBackgroundDark})`
          : `url(${this.whatsBackground})`,
      };
    },
  },
  async mounted() {
    // await this.listarKanbans()
    this.userProfile = localStorage.getItem("profile");
    const featuresAllow =
      JSON.parse(localStorage.getItem("controlFeatures")) || "disabled";
    if (featuresAllow === "enabled" && this.userProfile === "user") {
      this.controlFeatures = false;
    } else {
      this.controlFeatures = true;
    }

    if (this.ticket && this.ticket.contactId) {
      const informacoes = await this.obterInformacoes(this.ticket);
      this.tagsDoTicket = informacoes.tags;
      this.walletsDoTicket = informacoes.wallets;
    }

    this.$store.subscribe(async (mutation, state) => {
      if (
        mutation.type === "UPDATE_CONTACT" &&
        mutation.payload.id === this.ticket?.contactId
      ) {
        const informacoes = await this.obterInformacoes(this.ticket);
        this.tagsDoTicket = informacoes.tags;
        this.walletsDoTicket = informacoes.wallets;
      }
    });
  },
  methods: {
    async handleImageError() {
      if (!this.ticket.contactId) return;
      try {
        await RemoverFotoNula(this.ticket.contactId);
      } catch (error) {
        console.error(
          this.$t("atendimentoItemTicket.errors.erroRemoverFoto"),
          error
        );
      }
    },
    closeModal() {
      this.isTicketModalOpen = false;
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const dialogContent = document.querySelector(".q-dialog__inner > div");
        if (dialogContent) {
          dialogContent.scrollTop = dialogContent.scrollHeight;
        }
      });
    },
    obterNomeFila(ticket) {
      try {
        const fila = this.filas.find((f) => f.id === ticket.queueId);
        if (fila) {
          return fila.queue;
        }
        return "";
      } catch (error) {
        return "";
      }
    },
    // async listarKanbans(){
    //   const { data } = await ListarKanbans();
    //   this.kanbans = data.kanban;
    // },
    // getKanbanName(kanbanId) {
    //   const kanban = this.kanbans.find(k => k.id === kanbanId);
    //   return kanban ? kanban.name : '';
    // },
    async obterInformacoes(ticket) {
      try {
        if (!ticket || !ticket.contactId) {
          console.warn(this.$t("atendimentoItemTicket.errors.ticketInvalido"));
          return { tags: [], wallets: [] };
        }

        const contato = await ObterContato(ticket.contactId);
        if (contato) {
          return {
            tags: contato.data.tags.map((tag) => ({
              tag: tag.tag,
              color: tag.color,
            })),
            wallets: contato.data.wallets.map((wallet) => ({
              wallet: wallet.name,
            })),
          };
        }
        return { tags: [], wallets: [] };
      } catch (error) {
        console.error("Erro ao obter informações do contato:", error);
        return { tags: [], wallets: [] };
      }
    },
    // Função para calcular se deve usar texto claro ou escuro baseado na cor de fundo
    getContrastTextColor(backgroundColor) {
      if (!backgroundColor) return "#000000";

      // Remove # se existir
      const color = backgroundColor.replace("#", "");

      // Converte para RGB
      const r = parseInt(color.substr(0, 2), 16);
      const g = parseInt(color.substr(2, 2), 16);
      const b = parseInt(color.substr(4, 2), 16);

      // Calcula a luminosidade usando a fórmula padrão
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      // Se a luminosidade for maior que 0.5, usar texto escuro, senão usar texto claro
      return luminance > 0.5 ? "#000000" : "#ffffff";
    },
    dataInWords(timestamp, updated) {
      let data = parseJSON(updated);
      if (timestamp) {
        data = new Date(Number(timestamp));
      }
      return formatDistance(data, new Date(), { locale: pt });
    },
    async marcarComoLido(ticket) {
      try {
        if (ticket.status === "open") {
          await AtualizarTicketNaoLido(ticket.id, 0);
        }
      } catch (error) {
        console.error(error);
      }
    },
    abrirChatContato(ticket) {
      // console.log('ItemTicket - Tentando abrir chat:', {
      //   ticketId: ticket.id,
      //   status: ticket.status,
      //   ticketFocado: this.$store.getters.ticketFocado.id,
      //   routeName: this.$route.name
      // });

      // caso esteja em um tamanho mobile, fechar a drawer dos contatos
      if (this.$q.screen.lt.md && ticket.status !== "pending") {
        this.$root.$emit("infor-cabecalo-chat:acao-menu");
      }
      if (
        !(
          ticket.status !== "pending" &&
          (ticket.id !== this.$store.getters.ticketFocado.id ||
            this.$route.name !== "chat")
        )
      ) {
        return;
      }
      this.$store.commit("SET_HAS_MORE", true);
      this.$store.dispatch("AbrirChatMensagens", ticket);
    },
  },
  created() {
    const atualizarHora = () => {
      this.recalcularHora++;
      setTimeout(() => requestAnimationFrame(atualizarHora), 20000);
    };
    atualizarHora();
  },

  // created () {
  //   setInterval(() => {
  //     this.recalcularHora++
  //   }, 20000)
  // }
};
</script>

<style lang="sass">
img:after
  content: ""
  vertical-align: middle
  display: inline-block
  border-radius: 50%
  font-size: 48px
  position: absolute
  top: 0
  left: 0
  width: inherit
  height: inherit
  z-index: 10
  color: transparent

// Estilo para o scroll do dialog
.q-dialog__inner > div::-webkit-scrollbar
  width: 8px
  background-color: rgba(0, 0, 0, 0.1)

.q-dialog__inner > div::-webkit-scrollbar-thumb
  background-color: $primary
  border-radius: 4px

.q-dialog__inner > div::-webkit-scrollbar-track
  background-color: rgba(0, 0, 0, 0.05)

.ticket-active-item
  border-radius: 0
  position: relative
  height: 100%
  background: $blue-1

#ListItemsTicket
  .q-item__label + .q-item__label
    margin-top: 1.5px

#item-ticket-houve:hover
  background: $blue-1
  transition: all .2s

.primary
  border-left: 3px solid $primary
.negative
  border-left: 3px solid $negative
.positive
  border-left: 3px solid $positive

.ticketNotAnswered
  border-left: 5px solid $warning !important

.ticketBorder
  border-left: 5px solid $grey-9

.ticketBorderGrey
  border-left: 5px solid $grey-4

.channel-icon
  position: absolute
  top: 30px
  right: -5px
  background: white
  border-radius: 50%
  padding: 2px

// Responsividade para badges de tags
.q-item
  transition: height 0.2s ease-in-out

// Estilo para as badges de tags
.tags-container
  .q-chip
    font-size: 0.65rem !important
    line-height: 1.2

// Badges com text ellipse (apenas tags)
.tag-chip
  max-width: 80px !important
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
  display: inline-block
  position: relative
  z-index: 1

// Garantir que o tooltip apareça acima de outros elementos
.tag-chip .q-tooltip
  z-index: 9999 !important

// Estilos específicos para o conteúdo da chip
.tag-chip .q-chip__content
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
  max-width: 100%

// Responsividade mobile
@media (max-width: 600px)
  .tags-container
    .q-badge
      font-size: 0.6rem !important
      padding: 1px 4px !important

  .tag-badge
    max-width: 60px !important
</style>

