<template>
  <div>OpenID Connect login</div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import GoogleCredentials from '@/services/security/oid/providers/google.com/GoogleCredentials';
import firestoreUserService from '@/services/firestore';
import router from '@/router';

@Component({
  name: 'GoogleOidcLoingComponent',
})
export default class GoogleOidcLoginComponent extends Vue {
  theRouter = router;

  mounted() {
    const locationHash = this.theRouter.currentRoute.hash;
    console.debug('Google hash', locationHash);
    const hashTokens = locationHash.substring(1).split('&');
    const hashMap : { [key:string]:string } = {};
    hashTokens.forEach((t) => {
      const [key, value] = t.split('=');
      hashMap[key] = value;
    });
    const requestPath = this.theRouter.resolve({ path: hashMap.state }).href;
    const requestUri = window.self.location.origin + requestPath;
    const payload = new GoogleCredentials(hashMap.id_token, requestUri);
    firestoreUserService.login(payload)
      .then(() => this.theRouter.push({ path: hashMap.state }));
  }
}
</script>
