# cosnova-kisstance
Kisstance microsite

## dev setup

```
npm install
npm run serve

// if you work on SCSS:
npm run watch:scss
```

## lint

All options:
```
npm run lint:css
npm run lint:js
npm run lint:all
npm run lint:css:fix
npm run lint:js:fix
```
## clean SVG

```
npm run clean:svg
```
## deployment process

Make sure to merge everything to master to keep it up-to-date. 
We have an Azure pipeline that pushed automatically when master is updated. This is our [stage enviroment](https://kisstance.z1.web.core.windows.net/).

To deploy, you need to ping @andreasmaser (when urgent) who has the credentials or he will deploy in the evening around 6pm. The goal is to deploy once a day (not more).

After you update master, please check stage to make sure everything is working as expected. 