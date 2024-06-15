<template>
    <div>
        <div>
            <b-navbar toggleable="lg" type="dark" variant="transparent">
          
              <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          
              <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav >
                  <h2>Welcome</h2>
                </b-navbar-nav>
          
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <h4>Admin</h4>
                </b-navbar-nav>
              </b-collapse>
            </b-navbar>
        </div>
        <div class="row container-fluid mt-4">
            <div class="col">
                <div class="user-box-1 p-2">
                    <!-- 01 -->
                    <div class="row">
                        <div class="col-9">
                            <p>Preview</p>
                            <iframe src="/" width="100%" height="550px" frameborder="0"></iframe>
                        </div>
                        <div class="col-3">
                            <div class="row pr-3">
                                <div v-if="page_value != 1" class="col admin-edit-box">
                                    <button @click="pages(1);" class="edit-btn btn">เลขนำโชค</button>
                                </div>
                                <div v-if="page_value == 1" class="col admin-edit-box-active">
                                    <button @click="pages(1);" class="edit-btn btn">เลขนำโชค</button>
                                </div>
                                <div v-if="page_value != 2" class="col admin-edit-box">
                                    <button @click="pages(2);" class="edit-btn btn">ดูดวงราศี</button>
                                </div>
                                <div v-if="page_value == 2" class="col admin-edit-box-active">
                                    <button @click="pages(2);" class="edit-btn btn">ดูดวงราศี</button>
                                </div>
                                <div v-if="page_value != 3" class="col admin-edit-box ">
                                    <button @click="pages(3);" class="edit-btn btn">ทำนายฝัน</button>
                                </div>
                                <div v-if="page_value == 3" class="col admin-edit-box-active ">
                                    <button @click="pages(3);" class="edit-btn btn">ทำนายฝัน</button>
                                </div>
                            </div>
                            <div class="menuinnerinner">
                                <number v-if="page_value == 1"></number>
                                <zodiac v-if="page_value == 2"></zodiac>
                                <dream v-if="page_value == 3"></dream>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import number from '../../components/admin/Editpage/Editnumber.vue'
import zodiac from '../../components/admin/Editpage/Editzodiac.vue'
import dream from '../../components/admin/Editpage/Editdream.vue'
export default {
    components: {
        number,
        zodiac,
        dream

    },
    data(){
        return {
            page_value: 1
        }
    },
    methods:{
        pages( page ){
            this.page_value = page
        }
    }


}
</script>

<style>
.menuinnerinner {
    height: 600px;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 20px;
}
.admin-edit-box{
    background: #D9D9D9;
    border-radius: 10px 10px 0 0;
}
.admin-edit-box-active{
    background: #043128;
    border-radius: 10px 10px 0 0;
}
.edit-btn{
    width: 100%;
    font-size: 12px;
    padding: 10px 0;
    color: #ffffff;
    font-weight: bold;
}
.btn:focus, .btn.focus {
    box-shadow: none;
}
.btn-check:checked+.btn, .btn.active, .btn.show, .btn:first-child:active, :not(.btn-check)+.btn:active {
    border-color: none;
}
</style>