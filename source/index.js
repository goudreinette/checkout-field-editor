const testData = {
	categories: {
		'*': {
			'billing_firstname': {
				label: 'First Name',
				required: true
			}
		}
	}
}

new Vue({
	el: '.container',
	data: testData,
	template: '#main'
})

Vue.component('field', {
	el: '#field'
})