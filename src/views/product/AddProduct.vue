 <template>
 <div class="container">
    <div class="row border p-4 my-5 rounded">
      <div class="col-9">
        <form v-on:submit.prevent="handleSubmit()">
          <div class="h2 text-center text-success">{{ prodId ? "Update" : "Create" }} Product</div>
          <hr />
          <div v-if="errorList.length > 0" class="alert alert-danger pb-0">
            Please fix the following errors:
            <ul>
              <li v-for="error of errorList">{{error}}</li>
            </ul>
          </div>

          <div class="mt-3">
            <span class="text-muted">Name</span>
            <input type="text" class="form-control" v-model.trim="productObj.name"/>
          </div>
          <div class="mt-3">
            <span class="text-muted">Description</span>
            <textarea type="text" class="form-control" v-model.trim="productObj.description"></textarea>
          </div>
          <div class="mt-3">
            <span class="text-muted">Price</span>
            <input type="number" class="form-control" v-model.number="productObj.price"/>
          </div>

          <div class="mt-3">
            <span class="text-muted">Sale Price</span>
            <input type="number" class="form-control" v-model.number="productObj.salePrice"/>
          </div>
          <div class="mt-3">
            <span class="text-muted">Tags (comma-seperated)</span>
            <input
              type="text"
              class="form-control"
              v-model="productObj.tags"
              placeholder="e.g., modern, classic, luxury"
            />
          </div>
          <div class="form-check form-switch pt-3">
            <input class="form-check-input" v-model="productObj.isBestSeller" type="checkbox" role="switch" />

            <label class="form-check-label" for="bestseller">
              Bestseller
            </label>
          </div>
          <div class="mt-3">
            <label class="text-muted">Category</label>
            <select class="form-select" v-model="productObj.category">
              <option v-for="product of PRODUCT_CATEGORIES" :key="product" :value="product">{{ product }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Image</label>
            <div class="input-group">
              <input type="file" class="form-control" />
            </div>
          </div>
          <div class="pt-3">
            <button class="btn btn-success m-2 w-25" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>Submit
            </button>
            <router-link :to="APP_ROUTE_NAMES.PRODUCT_LIST" class="btn btn-secondary m-2 w-25"> Cancel </router-link>
          </div>
        </form>
      </div>
      <div class="col-3">
        <img
          :src="`https://placehold.co/600x400`"
          class="img-fluid w-100 m-3 p-3 rounded"
          alt="Product
        preview"
        />
      </div>
    </div>
  </div>
  </template>
<script setup>
import {reactive, ref, onMounted } from "vue";
import {useRouter, useRoute} from "vue-router";

import {PRODUCT_CATEGORIES} from "@/constants/appConstant";
import { useSwal } from '@/utility/useSwal'
import productService from '@/services/productService'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
const { showSuccess, showError, showConfirm } = useSwal()


const route = useRoute();
const router = useRouter();
const loading = ref(false);
const errorList = reactive([]);
const productObj =reactive({
    name: "",
    description: "",
    price: 0,
    salePrice: 0,
    tags: [],
    isBestSeller: false,
    category: "",
    image: ""
})
const prodId = route.params.id;
console.log("prod is ", prodId);
onMounted(async () => {
    if(!prodId) {
        return;
    } else {
       loading.value = true;
       productService.getProductById(prodId).then((product) => {
            Object.assign(productObj, { ...product, tags: product.tags.join(', ') });
            loading.value = false;
       }, (err) => {
            loading.value = false;
       });
       
    }
})

function handleSubmit() {
    console.log("product obj ", productObj);
    errorList.length = 0;
    if (productObj?.name?.length < 3) {
        errorList.push("Name should be atleast 3 characters long.");

    }
    if (productObj?.price <= 0) {
        errorList.push("price should be greater than 0.");
        
    }
    if (productObj?.category == '') {
        errorList.push("select atleast one cateogory");
        
    }
    if (errorList?.length > 0) {
        return ;
    }
    loading.value = true;
    console.log("productObj.tags ", productObj.isBestSeller);
 
    const productData = {
        ...productObj,
        price: Number(productObj.price),
        salePrice: productObj?.salePrice ? Number(productObj?.salePrice) : null,
        tags:productObj.tags.length > 0 ?  productObj.tags?.split(",").map((tag) => tag.trim()) : [],
        bestseller: Boolean (productObj?.isBestSeller)
    };
    if (prodId) {
         productService.updateProduct(prodId,productData).then((data) => {
            console.log("data is updated ", data);
            loading.value = false;
            showSuccess("Product updated successfully.");
            router.push({name: APP_ROUTE_NAMES.PRODUCT_LIST})
        }, (err) => {
            console.log("err");
            showError("Something went wrong.");
            router.push({name: APP_ROUTE_NAMES.PRODUCT_LIST})
            loading.value = false;
        })
    } else {
        productService.createProduct(productData).then((data) => {
            console.log("data is created ", data);
            loading.value = false;
            showSuccess("Product created successfully.");
            router.push({name: APP_ROUTE_NAMES.PRODUCT_LIST})
        }, (err) => {
            console.log("err");
            showError("Something went wrong.");
            router.push({name: APP_ROUTE_NAMES.PRODUCT_LIST})
            loading.value = false;
        })
    }
    

    console.log("product dat ", productData);

}
</script>