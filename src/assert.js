class Assert {

	static integer(value, caller) {
		if (!Number.isInteger(value))
			throw new TypeError(`${caller}: Value must be an integer.`);
	}

	static integerMin(value, min, caller) {
		Assert.integer(value, caller);
		if (value < min)
			throw new RangeError(`${caller}: Value cannot be less than ${min}.`);
	}

	static integerMax(value, max, caller) {
		Assert.integer(value, caller);
		if (value > max)
			throw new RangeError(`${caller}: Value cannot be greater than ${max}.`);
	}

	static index(value, caller) {
		Assert.integerMin(value, 0, caller);
	}

}

exports.Assert = Assert;
