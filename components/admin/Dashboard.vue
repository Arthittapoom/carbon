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
        <div class="row container-fluid mt-5">
            <div class="col">
                <div class="admin-box-1 container">
                    <div class="row">
                        <div class="col-8">
                            <h3 class="text-s-22">จำนวนคนSub</h3>
                        </div>
                        <div class="col-4">
                            <h3 class="text-s-15">Today</h3>
                        </div>
                    </div>
                    <div class="admin-line-1 mt-2"></div>
                    <div class="row mt-4">
                        <div class="col">
                            <h2 class="text-s-35 fw-bold">9460</h2>
                        </div>
                        <div class="col">
                            <h3 class="text-red">↓ 1.5%</h3>
                        </div>
                    </div>
                        <p class="text-s-22 mt-4">Compared to $9940 yesterday</p>
                    <div class="row mt-3">
                        <div class="col">
                            <h4 class="text-s-15">Last week Income</h4>
                        </div>
                        <div class="col">
                            <h4 class="text-s-15">$25658.00</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="admin-box-1 container">
                    <div class="row">
                        <div class="col-8">
                            <h3 class="text-s-22">จำนวนคนล็อคอิน</h3>
                        </div>
                        <div class="col-4">
                            <h3 class="text-s-15">Today</h3>
                        </div>
                    </div>
                    <div class="admin-line-1 mt-2"></div>
                    <div class="row mt-4">
                        <div class="col">
                            <h2 class="text-s-35 fw-bold">50</h2>
                        </div>
                        <div class="col">
                            <h3 class="text-green">↑ 2.5%</h3>
                        </div>
                    </div>
                        <p class="text-s-22 mt-4">Compared to $5240 yesterday</p>
                    <div class="row mt-3">
                        <div class="col">
                            <h4 class="text-s-15">Last week expences</h4>
                        </div>
                        <div class="col">
                            <h4 class="text-s-15">$22658.00</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="admin-box-1 container">
                    <div class="row">
                        <div class="col-8">
                            <h3 class="text-s-22">จำนวนคนเข้าดูเว็บไซต์</h3>
                        </div>
                        <div class="col-4">
                            <h3 class="text-s-15">เดือนนี้</h3>
                        </div>
                    </div>
                    <div class="admin-line-1 mt-2"></div>
                    <div class="row mt-4">
                        <div class="col">
                            <h2 class="text-s-35 fw-bold">9460</h2>
                        </div>
                        <div class="col">
                            <h3 class="text-red">↓ 1.5%</h3>
                        </div>
                    </div>
                      <!-- Doughnut_Chart -->
                    <Doughnut_Chart ></Doughnut_Chart>
                </div>
            </div>
        </div>
        <div class="admin-box-2 container mt-5 ml-5">
            <LineChart></LineChart>
        </div>
    </div>
</template>

<script>
import Doughnut_Chart from '../../components/Chart/Doughnut_Chart.vue';
import LineChart from '../../components/Chart/LineChart.vue';
export default {
    components: {
        Doughnut_Chart,
        LineChart
    }  
}
</script>

<style>

</style>