<template>
  <div class="post">
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="rates" class="content">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Currency</th>
                <th class="text-left">Rate for Bitcoin</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in rates" :key="item.code">
                <td>{{ item.code }}</td>
                <td v-html="item.price"></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getRates } from './RateUtils';
// import ExchangeRate from './model/ExchangeRate';

@Component({
  name: 'BitcoinRate',
})
export default class BitcoinRate extends Vue {
  loading : Boolean = true;

  rates!: any[];

  error = null;

  mounted() {
    this.rates = [];
    getRates().then((result) => {
      this.rates = result;
      this.loading = false;
    });
  }
}
</script>
