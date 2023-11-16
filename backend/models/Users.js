import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 30,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		maxlength: 99,
	},
	_id: Number,
});

const User = mongoose.model('User', userSchema);
export default User;
