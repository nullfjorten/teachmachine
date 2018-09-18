<template>
    <div>
        <div class="row">
            <div class="col-sm-12">
                <h1>{{ heading }}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="alert" :class="{'alert-success': alertSuccess, 'alert-info': alertInfo }">
                    <form>
                        <h2>{{ problem }} </h2>
                        
                        <input type="text" v-model="answer" ref="txtAnswer" @keypress.space="enterPressed" class="form-control mb-3" pattern="\d*">

                        <button @click.prevent="generateProblem" class="btn btn-primary">New problem!</button>

                        {{ assessment }}

                        <hr>
                        <div>
                            <div class="alert alert-dark">
                                <button class="btn btn-secondary" @click.prevent="setActiveProblemType('+')">+</button>
                                <button class="btn btn-secondary" @click.prevent="setActiveProblemType('-')">-</button>
                                <button class="btn btn-secondary" @click.prevent="setActiveProblemType('*')">*</button>
                                <button class="btn btn-secondary" @click.prevent="setActiveProblemType('/')">/</button>
                            </div>
                            <hr>
                            <div class="alert alert-dark">
                                <button class="btn btn-secondary" @click.prevent="setProblemDifficulty('1')">Lett</button>
                                <button class="btn btn-secondary" @click.prevent="setProblemDifficulty('2')">Middels</button>
                                <button class="btn btn-secondary" @click.prevent="setProblemDifficulty('3')">Vanskelig</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-lg-12">
            </div>
            <div class="col-lg-12" v-show="true">
                <ul>
                <li>numQuestionsAsked: {{ numQuestionsAsked }}</li>
                <li>numCorrectAnswers: {{ numCorrectAnswers }}</li>
                <li>difficulty: {{ difficulty }}</li>
                <li>Answer: {{ correctAnswer }}</li>
                </ul>
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
            a: '',
            b: '',
            numQuestionsAsked: 0,
            numCorrectAnswers: 0,
            alertSuccess: false, // TODO: Fiks bedre navn/logikk på CSS-klassesetting. Computed properties?
            alertInfo: true,
            booAnswered: false,
        }
    },
    computed: {
        heading () {
            return this.problemTypes[this.activeProblemTypeIndex].heading;
        },
        assessment: function() {
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
                return true;
            }
            else {
                this.markInfo();
                return false;
            }
        }
    },
    methods: {
        setActiveProblemType(problemTypeOperator) {
            this.focusInputField();
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
            $
        },
        generateProblem () {
            var operator = this.problemTypes[this.activeProblemTypeIndex].operator;

            //this.a = Math.random();
            //this.b = Math.random();

            switch (operator) {
                case '+': 
                    switch (this.difficulty) {
                        case '1': this.setRandomIntAB([0, 10]); break;
                        case '2': this.setRandomIntAB([3, 100], [7, 25]); break;
                        case '3': this.setRandomIntAB([11, 100]); break;
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
            return Math.floor(Math.random() * (max - min + 1)) + min;
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
    li { list-style-type: none; }
</style>
