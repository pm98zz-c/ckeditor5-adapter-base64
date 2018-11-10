/**
 * @module adapter-base64/uploadadapter
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';

/**
 * A plugin that enables base64 encoded uploads in CKEditor 5.
 *
 * @extends module:core/plugin~Plugin
 */
export default class Base64UploadAdapter extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [FileRepository];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'Base64UploadAdapter';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		// Register our Adapter
		this.editor.plugins.get(FileRepository).createUploadAdapter = loader => new UploadAdapter(loader);
	}
}

/**
 * Upload adapter.
 *
 * @private
 * @implements module:upload/filerepository~UploadAdapter
 */
class UploadAdapter {
	/**
	 * Creates a new adapter instance.
	 *
	 * @param {module:upload/filerepository~FileLoader} loader
	 */
	constructor(loader) {
		/**
		 * FileLoader instance to use during the upload.
		 *
		 * @member {module:upload/filerepository~FileLoader} #loader
		 */
		this.loader = loader;
	}

	/**
	 * Fake the upload process.
	 *
	 * @see module:upload/filerepository~UploadAdapter#upload
	 * @returns {Promise}
	 */
	upload() {
		const loader = this.loader;
		return new Promise(function (resolve, reject) {
			var file = loader.file;
			var reader = new FileReader();
			reader.onloadend = function () {
				resolve({
					default: reader.result
				});
			}
			reader.readAsDataURL(file);
		});

	}

	/**
	 * No way to actually abort the upload process.
	 *
	 * @see module:upload/filerepository~UploadAdapter#abort
	 * @returns {Promise}
	 */
	abort() {

	}

}