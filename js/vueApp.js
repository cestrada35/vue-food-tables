const app = new Vue({
    el: '#app',
    data: {
      stats: [],
      currentSort:'name',
      currentSortDir:'asc',
      pageSize: 5,
      currentPage:1,
    },
    
    methods: {
      sort(s) {
        //if s == current sort, reverse
        if(s === this.currentSort) {
          this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
        }
        this.currentSort = s;
      },
      nextPage:function() {
        if((this.currentPage*this.pageSize) < this.stats.length) this.currentPage++;
      },
      prevPage:function() {
        if(this.currentPage > 1) this.currentPage--;
      },
      dataPush(item){
        this.stats.push ({
          name: `${item[0].lowercaseDescription}`, 
          cals: `${item[0].foodNutrients[7].nutrientNumber}`,
          fats: `${item[0].foodNutrients[13].value}`,
          carbs: `${item[0].foodNutrients[6].value}`,
          protein: `${item[0].foodNutrients[4].value}`,
          iron: `${item[0].foodNutrients[1].value}`,
        });
      },     
      // ASYNCRONOUS DATA RETRIEVAL---Note: Data Central API has request limit of 1000 requests/hour
      async fetchProducts() {

        try {

            const froyoResponse = await fetch('https://api.nal.usda.gov/fdc/v1/foods/search?query=frozen%20yogurt&pageSize=1&api_key=bgxbaO2gJlQXXj2X2LADlfj3ejYuwcVfUomG1TNb');
            const iceCreamResponse = await fetch('https://api.nal.usda.gov/fdc/v1/foods/search?query=ice%20cream%20sandwich&pageSize=1&api_key=bgxbaO2gJlQXXj2X2LADlfj3ejYuwcVfUomG1TNb');
            const eclairResponse = await fetch('https://api.nal.usda.gov/fdc/v1/foods/search?query=eclair%20cake&pageSize=1&api_key=bgxbaO2gJlQXXj2X2LADlfj3ejYuwcVfUomG1TNb');
            const cupCakeResponse = await fetch('https://api.nal.usda.gov/fdc/v1/foods/search?query=cupcake&pageSize=1&api_key=bgxbaO2gJlQXXj2X2LADlfj3ejYuwcVfUomG1TNb');
            const gingerBreadResponse = await fetch('https://api.nal.usda.gov/fdc/v1/foods/search?query= gingerbread&pageSize=1&api_key=bgxbaO2gJlQXXj2X2LADlfj3ejYuwcVfUomG1TNb');
            const jellyBeanResponse = await fetch('https://api.nal.usda.gov/fdc/v1/foods/search?query=jelly%beans&pageSize=1&api_key=bgxbaO2gJlQXXj2X2LADlfj3ejYuwcVfUomG1TNb');
            const lollipopResponse = await fetch('https://api.nal.usda.gov/fdc/v1/foods/search?query=lollipop&pageSize=1&api_key=bgxbaO2gJlQXXj2X2LADlfj3ejYuwcVfUomG1TNb');
            const honeyCombResponse = await fetch('https://api.nal.usda.gov/fdc/v1/foods/search?query=honeycomb%20honey&pageSize=1&api_key=bgxbaO2gJlQXXj2X2LADlfj3ejYuwcVfUomG1TNb');
            const donutResponse = await fetch('https://api.nal.usda.gov/fdc/v1/foods/search?query=donut&pageSize=1&api_key=bgxbaO2gJlQXXj2X2LADlfj3ejYuwcVfUomG1TNb');
            const kitKatResponse = await fetch('https://api.nal.usda.gov/fdc/v1/foods/search?query=kitkat&pageSize=1&api_key=bgxbaO2gJlQXXj2X2LADlfj3ejYuwcVfUomG1TNb');
            

            if (!froyoResponse.ok) {
                throw new Error(`HTTP error: ${froyoResponse.status}`);
            }

            const froyoJson = await froyoResponse.json();
            const iceCreamJson = await iceCreamResponse.json();
            const eclairJson = await eclairResponse.json();
            const cupCakeJson = await cupCakeResponse.json();
            const gingerBreadJson = await gingerBreadResponse.json();
            const jellyBeanJson = await jellyBeanResponse.json();
            const lollipopJson = await lollipopResponse.json();
            const honeyCombJson = await honeyCombResponse.json();
            const donutJson = await donutResponse.json();
            const kitKatJson = await kitKatResponse.json();

            const froyo = froyoJson.foods;
            const iceCream = iceCreamJson.foods;
            const eclair = eclairJson.foods;
            const cupCake = cupCakeJson.foods;
            const gingerBread = gingerBreadJson.foods;
            const jellyBean = jellyBeanJson.foods;
            const lollipop = lollipopJson.foods;
            const honeyComb = honeyCombJson.foods;
            const donut = donutJson.foods;
            const kitKat = kitKatJson.foods;

            this.dataPush(froyo);
            this.dataPush(iceCream);
            this.dataPush(eclair);
            this.dataPush(cupCake);
            this.dataPush(gingerBread);
            this.dataPush(jellyBean);
            this.dataPush(lollipop);
            this.dataPush(honeyComb);
            this.dataPush(donut);
            this.dataPush(kitKat);

        }

        catch(error) {
            console.error(`Could not get products: ${error}`);
        }
      }
    },

    beforeMount(){
      this.fetchProducts()
    },

    computed:{
      sortedStats() {
        return this.stats.sort((a,b) => {
          let modifier = 1;
          if(this.currentSortDir === 'desc') modifier = -1;
          if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        }).filter((row, index) => {
          let start = (this.currentPage-1)*this.pageSize;
          let end = this.currentPage*this.pageSize;
          if(index >= start && index < end) return true;
        });
      }
    }
  });


