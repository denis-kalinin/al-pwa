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
import { Vue, Component, Prop } from 'vue-property-decorator';
import { getRates } from '../components/bitcoin/RateUtils';
import { ExchangeRate } from '../components/bitcoin/model/ExchangeRate';

@Component({
  name: 'FetchExample',
})
export default class FetchExample extends Vue {
  loading : Boolean = false;

  rates : ExchangeRate[] = [];

  error = null;

  mounted() {
    getRates().then((result) => {
      this.rates = result;
    });
  }
}
</script>
