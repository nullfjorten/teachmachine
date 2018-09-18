<template>
    <div>
        <div class="row">
            <div class="col-md-12 col-lg-8 offset-lg-2">
                <div class="col-12">
                    <OrderElements
                        :heading="heading"
                        :task="task"
                    ></OrderElements>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// http://paletton.com/#uid=10n0u0kt+lZlOstrKqzzSiaJidt

import OrderElements from './OrderElements.vue';

export default {
    components: {
        OrderElements
    },
	data() {
		return {
            heading: "Nynorsk.A.Ord med om lag same tyding",
            task: {
                text: "Alle desse orda er namn på hus av ulike slag: ",
                text2: "Fyll ut dei opne romma slik at namna på husa ovanfor kjem i rekkje etter storleiken på husa!",
                elements: [
                    "koie",
                    "hytte",
                    "villa",
                    "slott",
                    "palass",
                    "romstasjon",
                ]
            },
		};
    },
};
</script>

<style local>

</style>
