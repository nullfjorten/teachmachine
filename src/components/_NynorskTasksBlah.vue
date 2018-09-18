<template>
    <div>
        <div class="row">
            <div class="col-md-12 col-lg-8 offset-lg-2">
                <div class="col-12">
                    <h1>{{ heading }}</h1>
                    <p>I desse setningane er dei utheva orda <b>feil</b> brukte. Finn dei rette orda og skriv dei under stykket på rett stad.</p>
                    <ul>
                        <li>Roald Amundsen <span>fann opp</span> Sørpolen.</li>
                        <li><span>Flyttina</span> kom på ein stor lastebil.</li>
                        <li>Det var eit <span>interessert</span> foredrag.</li>
                        <li>Det finst mange <span>kristne</span> foreininar i landet vårt.</li>
                        <li>Vi var svoltne og <span>irriterande</span>.</li>
                        <li>Frå flyet hadde vi fint utsyn over <span>landsbygda</span>.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// http://paletton.com/#uid=10n0u0kt+lZlOstrKqzzSiaJidt

export default {
	created() {},
	mounted() {},
	data() {
		return {
            heading: "Nynorsk",
            taskData: {
                text: "I desse setningane er dei utheva orda <b>feil</b> brukte. Finn dei rette orda og skriv dei under stykket på rett stad.",
                dataA: [
                    ["Roald Amundsen % Sørpolen.", "fann opp", "fann" ],
                    [ "% kom på ein stor lastebil", "Flyttinga", "Flyttelasset" ],
                    [ "Det var eit % foredrag.", "interessert", "interessant" ],
                    [ "Det finst mange % foreiningar i landet vårt.", "kristne", "kristne" ],
                    [ "Vi var svoltne og %", "irriterande", "irriterte" ],
                    [ "Frå flyet hadde vi fint utsyn over %.", "landsbygda", "landsbygda" ],
                ]
            },
		};
	},
};
</script>

<style local>
.color-primary-0 { color: #AF4A0B }	/* Main Primary color */
.color-primary-1 { color: #E38348 }
.color-primary-2 { color: #D4621C }
.color-primary-3 { color: #913700 }
.color-primary-4 { color: #6B2900 }

li span {
    color: #E38348;
    text-decoration: underline;
    padding: .2rem;
    border-radius: .2rem;
}
</style>
