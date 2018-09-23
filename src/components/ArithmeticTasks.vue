<template>
    <div>
        <div class="row">
            <div class="col-md-12 col-lg-8 offset-lg-2">
                <div class="col-12">
                    <h1>{{ heading }}</h1>
                </div>
                <div class="alert" :class="{'alert-success': alertSuccess, 'alert-info': alertInfo }">
                    <form>
                        <div class="row">
                            <div class="col-12">
                                <h2>{{ problem }} </h2>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-8">
                                <input type="text" v-model="answer" ref="txtAnswer" @keypress.enter="enterPressed" class="form-control mb-3" pattern="\d*" placeholder="Skriv svaret her">
                            </div>
                            <div class="col-md-4">
                                <button @click.prevent="generateProblem" class="btn btn-block btn-primary">Ny utfordring!</button>
                            </div>
                        </div>

                        <div class="alert alert-warning" v-show="false">
                            <div class="row">
                                <div class="col-12">
                                    {{ assessment }}&nbsp;
                                </div>
                            </div>

                            <div class="alert alert-info d-flex p-1 justify-content-center">
                                <div v-if="hundreds(a) > 0" class="flex-column">
                                    <div class="card text-center digitbox" style="background-color: #0ff; "
                                        v-for="i in hundreds(a)" :key="'hundredsA'+i">{{ i }}00
                                    </div>                                     
                                </div>
                                <div v-if="tens(a) > 0" class="flex-column">
                                    <div class="card text-center digitbox" style="background-color: #ff0;"
                                        v-for="i in tens(a)" :key="'tensA'+i">{{ i }}0
                                    </div>                                     
                                </div>
                                <div v-if="ones(a) > 0" class="flex-column">
                                    <div class="card text-center digitbox" style="background-color: #f0f;"
                                        v-for="i in ones(a)" :key="'onesA'+i">{{ i }}
                                    </div>                         
                                </div>
                                <div v-if="a == 0" class="flex-column digitbox">0</div>

                                <div class="flex-column text-center operatorbox rounded alert alert-dark">
                                    <i class="fa" :class="[
                                        operator == '+' ? 'fa-plus' : '',
                                        operator == '-' ? 'fa-minus' : '',
                                        operator == '*' ? 'fa-times' : '',
                                        operator == '/' ? 'fa-divide' : '',
                                    ]"></i>
                                </div>

                                <div v-if="hundreds(b) > 0" class="flex-column">
                                    <div class="card text-center digitbox" style="background-color: #0ff; "
                                        v-for="i in hundreds(b)" :key="'hundredsB'+i">{{ i }}00
                                    </div>                                     
                                </div>
                                <div v-if="tens(b) > 0" class="flex-column">
                                    <div class="card text-center digitbox" style="background-color: #ff0;"
                                        v-for="i in tens(b)" :key="'tensB'+i">{{ i }}0
                                    </div>                                     
                                </div>
                                <div v-if="ones(b) > 0" class="flex-column">
                                    <div class="card text-center digitbox" style="background-color: #f0f;"
                                        v-for="i in ones(b)" :key="'onesB'+i">{{ i }}
                                    </div>                         
                                </div>
                                <div v-if="b == 0" class="flex-column digitbox">0</div>
                            </div>
                        </div>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-12">
                                    <hr>
                                    Antall riktige: {{ numCorrectAnswers }}
                                    <hr>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 alert alert-warning">
                                    <button class="btn btn-link btn-change btn-operator" :class="[operator == '+' ? 'btn-change-active' : '']" @click.prevent="setActiveProblemType('+')"><i class="fa fa-plus"></i></button>
                                    <button class="btn btn-link btn-change btn-operator" :class="[operator == '-' ? 'btn-change-active' : '']" @click.prevent="setActiveProblemType('-')"><i class="fa fa-minus"></i></button>
                                    <button class="btn btn-link btn-change btn-operator" :class="[operator == '*' ? 'btn-change-active' : '']" @click.prevent="setActiveProblemType('*')"><i class="fa fa-times"></i></button>
                                    <button class="btn btn-link btn-change btn-operator" :class="[operator == '/' ? 'btn-change-active' : '']" @click.prevent="setActiveProblemType('/')"><i class="fa fa-divide"></i></button>
                                </div>
                                <div class="col-md-6 alert alert-warning">
                                    <button class="btn btn-link btn-change" :class="[difficulty == '1' ? 'btn-change-active' : '']" @click.prevent="setProblemDifficulty('1')">Lett</button>
                                    <button class="btn btn-link btn-change" :class="[difficulty == '2' ? 'btn-change-active' : '']" @click.prevent="setProblemDifficulty('2')">Middels</button>
                                    <button class="btn btn-link btn-change" :class="[difficulty == '3' ? 'btn-change-active' : '']" @click.prevent="setProblemDifficulty('3')">Vanskelig</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-lg-12" v-show="false">
                numQuestionsAsked: {{ numQuestionsAsked }}
                numCorrectAnswers: {{ numCorrectAnswers }}
                difficulty: {{ difficulty }}
                Answer: {{ correctAnswer }}
            </div>
            <div class="col-lg-12 text-center" v-show="true">
                <div>Skann denne QR-koden med mobilen for å få lenken til nettstedet.</div>
                <div>
                    <a href="https://teachmachine014.firebaseapp.com">
                        <img src="../assets/qr-link.png" alt="QR-kode, link til siden">
                    </a>
                </div>
                <div>
                    <a href="https://github.com/nullfjorten/teachmachine" target="_blank">Klikk her for prosjektets kildekode.</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.generateProblem();
    },
    mounted () {
        //this.focusInputField();
    },
    data () {
        return {
            problemTypes: [
                { 'operator': '+', 'heading': 'Addisjon (pluss)' },
                { 'operator': '-', 'heading': 'Subraksjon (minus)' },
                { 'operator': '*', 'heading': 'Multiplikasjon (gange)' },
                { 'operator': '/', 'heading': 'Divisjon (dele)' }
            ],
            activeProblemTypeIndex: 0, // 0-4
            difficulty: '1', // '1'-'3'
            points: 0,
            problem: '',
            correctAnswer: '',
            answer: '',
            a: 0,
            b: 0,
            numQuestionsAsked: 0,
            numCorrectAnswers: 0,
            alertSuccess: false, // TODO: Fiks bedre navn/logikk på CSS-klassesetting. Computed properties?
            alertInfo: true,
            booAnswered: false,
        }
    },
    computed: {
        operator () {
            return this.problemTypes[this.activeProblemTypeIndex].operator;
        },
        hundredsA () { return this.hundreds(this.a); },
        tensA ()     { return this.tens(this.a); },
        onesA ()     { return this.ones(this.a); },
        hundredsB () { return this.hundreds(this.b); },
        tensB ()     { return this.tens(this.b); },
        onesB ()     { return this.ones(this.b); },
        heading () {
            return this.problemTypes[this.activeProblemTypeIndex].heading;
        },
        assessment() {
            if (this.isCorrect) {
                if (!this.booAnswered) {
                    this.booAnswered = true;
                    this.numCorrectAnswers++;
                }
                return 'Superb!';
            }
            return '';
        },
        isCorrect() {
            if (this.answer.length > 0 && this.answer == this.correctAnswer) {
                this.markSuccess();
                this.generateProblem();
                return true;
            }
            else {
                this.markInfo();
                return false;
            }
        }
    },
    methods: {
        hundreds(value) {
            if (typeof value != 'number') { console.error("Hundreds(value) is not a number", value); }
            return Math.floor(value/100) % 100;
        },
        tens(value) {
            if (typeof value != 'number') { console.error("Tens(value) is not a number", value); }
            return Math.floor(value/10) % 10;
        },
        ones(value) {
            if (typeof value != 'number') { console.error("Ones(value) is not a number", value); }
            return value % 10;
        },
        setActiveProblemType(problemTypeOperator) {
            //this.focusInputField();
            for (var i = 0; i < this.problemTypes.length; i++) {
                if (problemTypeOperator == this.problemTypes[i].operator) {
                    if (i == this.activeProblemTypeIndex) {
                        return true; // No change
                    }
                    //this.numQuestionsAsked = this.numCorrectAnswers = 0;
                    this.activeProblemTypeIndex = i;
                    this.generateProblem();
                    this.numQuestionsAsked--;
                    return true; // Changed
                }
            }
            console.error('Invalid problemTypeOperator', problemTypeOperator);
            return false;
        },
        setProblemDifficulty (difficulty) {
            this.difficulty = difficulty;
            this.generateProblem();
            this.numQuestionsAsked--;
        },
        generateProblem () {
            var operator = this.operator;

            //this.a = Math.random();
            //this.b = Math.random();

            switch (operator) {
                case '+': 
                    switch (this.difficulty) {
                        case '1': this.setRandomIntAB([0, 10]); break;
                        case '2': this.setRandomIntAB([3, 100], [7, 25]); break;
                        case '3': this.setRandomIntAB([11, 300]); break;
                        default:
                            console.error('Invalid addition difficulty', this.difficulty);
                    }
                    break;
                case '-': 
                    switch (this.difficulty) {
                        case '1': this.setRandomIntAB([0, 10]); break;
                        case '2': this.setRandomIntAB([3, 100], [7, 25]); break;
                        case '3': this.setRandomIntAB([0, 100]); break;

                        default:
                            console.error('Invalid subtraction difficulty', this.difficulty);
                    }
                    if (this.b > this.a) { // Swap A/B to avoid negative answers
                        var tmp = this.a;
                        this.a = this.b;
                        this.b = tmp;
                    }
                    break;
                case '*': 
                    switch (this.difficulty) {                
                        case '1': this.setRandomIntAB([0, 10]); break;
                        case '2': this.setRandomIntAB([0, 100], [0, 9]); break;
                        case '3': this.setRandomIntAB([0, 100]); break;

                        default:
                            console.error('Invalid multiplication difficulty', this.difficulty);
                    }
                    break;
                case '/': 
                    switch (this.difficulty) {                
                        case '1': this.setRandomIntAB([0, 10], [1, 10]); break;
                        case '2': this.setRandomIntAB([0, 100], [1, 9]); break;
                        case '3': this.setRandomIntAB([0, 100], [1, 10]); break;
                        default:
                            console.error('Invalid division difficulty', this.difficulty);
                    }

                    var tmp = this.a * this.b; // Ensure answer is integer
                    this.a = tmp;
                    break;
            }
            
            this.problem = this.a +' '+ operator +' '+ this.b;
            this.correctAnswer = eval(this.a + operator + this.b);
            this.answer = '';
            this.booAnswered = false;
            this.numQuestionsAsked++;
        },
        focusInputField() {
            this.$refs.txtAnswer.focus();
        },
        enterPressed() {
            if (this.isCorrect) {
                this.generateProblem();
            }
        },
        markSuccess () {
            this.alertSuccess = true;
            this.alertInfo = false;
        },
        markInfo () {
            this.alertSuccess = false;
            this.alertInfo = true;
        },
        getRandomInt (min, max) {
            let a = Math.floor(Math.random() * (max - min + 1)) + min;
            if (a == 0) { // Should hopefully lower probability of rolling zero
                if (Math.random() > 0.5) {
                    a = this.getRandomInt(min, max); // Do reroll
                }
            }
            return a;
        },
        setRandomIntAB (arrMinMaxA, arrMinMaxB = null) {
            if (!Array.isArray(arrMinMaxB)) {
                arrMinMaxB = arrMinMaxA;
            }

            this.a = this.getRandomInt(arrMinMaxA[0], arrMinMaxA[1]);
            this.b = this.getRandomInt(arrMinMaxB[0], arrMinMaxB[1]);
        },
    }
}
</script>


<style scoped>
    .color-primary-0 { color: #AF4A0B }	/* Main Primary color */
    .color-primary-1 { color: #E38348 }
    .color-primary-2 { color: #D4621C }
    .color-primary-3 { color: #913700 }
    .color-primary-4 { color: #6B2900 }


    .main-panel-success {
        background-color: #6B2900;
    }
    .main-panel-fail {
        background-color: #6B2900;
    }

    li { list-style-type: none; }
    .digitbox {
        width: 22px;
        height: 17px;
        font-size: 10px;
        margin-right: 2px;
    }
    .operatorbox {
        font-size: 20px;
        margin: 5px 5px;
        height: 32px;
        width: 30px;
        padding: 0;
    }
    .btn-operator {
        width: 40px;
    }
    .btn-change-active {
        border: 2px solid rgba(83, 83, 83, 0.467);
        background-color: rgba(255, 255, 255, 0.279)
    }
    .btn-change {
        background-color: rgba(255, 255, 255, 0.4)
    }
</style>
