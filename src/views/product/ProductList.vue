<template>
     <div class="container py-4">
         <div v-if="loading" class="d-flex justify-content-center align-items-center vh-100">
            <div class="spinner-grow text-secondary">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    <div class="border rounded pb-3 px-2">
      <div
        class="card-header d-flex flex-column flex-md-row justify-content-between align-items-md-center p-4"
      >
        <div>
          <h1 class="text-secondary">Products</h1>
          <p class="mb-0 text-muted small">Manage your product listings</p>
        </div>
        <router-link :to="APP_ROUTE_NAMES.ADD_PRODUCT" class="btn btn-success btn-sm gap-2 rounded-1 px-4 py-2">
          <i class="bi bi-plus-square"></i> &nbsp;
          <span>Add Product</span>
        </router-link>
      </div>

      <div class="card-body p-3">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0 table-striped">
            <thead>
              <tr>
                <th class="ps-3 small text-muted">Product</th>
                <th class="small text-muted">Category</th>
                <th class="small text-muted">Pricing</th>
                <th class="small text-muted">Tags</th>
                <th class="small text-muted">Bestseller</th>
                <th class="pe-3 text-end small text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product of products" :key="product.id">
                <td class="ps-3">
                  <div class="d-flex align-items-center">
                    <img
                      :src="product.image || `https://placehold.co/50x50`"
                      class="rounded object-fit-cover me-2"
                      style="width: 50px; height: 50px"
                    />
                    <div>
                      <div class="fw-semibold small">{{product.name || "-"}}</div>
                      <small
                        class="text-muted text-truncate d-inline-block"
                        style="max-width: 200px"
                      >
                        {{product.description || "-"}}
                      </small>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    class="badge bg-secondary bg-opacity-10 text-secondary small"
                  >
                    {{product.category || "-"}}
                  </span>
                </td>
                <td>
                  <div class="d-flex flex-column">
                    <span class="fw-semibold small">{{product.price || "-"}}</span>
                    <span class="text-danger small"> {{ product.salePrice }} </span>
                  </div>
                </td>
                <td>
                  <div class="d-flex flex-wrap gap-1">
                    <span v-for="tag in product.tags" :key="tag" class="badge bg-info bg-opacity-10 text-info small">
                      {{tag}}
                    </span>
                  </div>
                </td>
                <td>
                  <span v-if="product.bestseller"
                    class="badge bg-warning bg-opacity-10 text-warning small"
                  >
                    Bestseller
                  </span>
                  <span v-else class="text-muted text-center">---</span>
                </td>
                <td class="pe-3 text-end">
                  <button @click="router.push('/edit-product/'+product.id);" class="btn btn-sm btn-outline-secondary m-2">
                    <i class="bi bi-pencil-fill"></i> Edit
                  </button>

                  <button @click="handleProductDelete(product.id)" class="btn btn-sm btn-outline-danger">
                    <i class="bi bi-trash3-fill"></i> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {onMounted, ref, reactive} from "vue";
import productService from '@/services/productService'
import { useSwal } from '@/utility/useSwal'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { useRouter } from "vue-router";
const { showSuccess, showError, showConfirm } = useSwal()
    const products = ref([]);
    const loading = ref(false);
    const router = useRouter();
    onMounted (() => {
        fetchProducts();
    })

    const fetchProducts = async () => {
        loading.value = true;
        productService.getProducts().then((data) => {
             products.value = data;
             loading.value = false;
             console.log("products ", data);
        }, (err) => {
            console.log("err ", err);
            loading.value = false;
        })
    }

    const handleProductDelete = async (productId) => {
        loading.value = true;
        const confirm = await showConfirm("Are you sure you want to delete?");
        console.log("confirm us ", confirm);
        if (confirm.isConfirmed) {
            productService.deleteProduct(productId).then(async (prod) => {
                console.log("prod is deleted ", prod);
                await showSuccess("Product deleted successfully.");
                fetchProducts();
            }, (err) => {
                console.log("prod err ", err);
                loading.value = false;
            })
        }
        
    }

</script>
