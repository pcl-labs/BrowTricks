# Browtricks

# Staging URL
https://staging.browtricksbeauty.com/

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

## iOS app setup

Generate icon and splash  
```
yarn global add cordova-res  
yarn capacitor:resources:ios
```  

Build and run xcode for iOS  
```
yarn capacitor:serve:production
```

## CI

Sometimes, you may want to push commits to your production branch without triggering a deploy on Netlify. To do this, add `[skip ci]` or `[skip netlify]` anywhere in the Git commit message.

In the case of multiple commits pushed together, add [skip ci] or [skip netlify] to the most recent commit, and it will apply to all other commits in the push.

## License

Licensed under the [GNU Affero General Public License v3.0](LICENSE).

## Tools

[<img src="https://raw.githubusercontent.com/whynotearth/shinta-mani-wild/master/src/assets/img/browserstack-logo.png">](https://browserstack.com)
