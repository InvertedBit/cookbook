import React from 'react';
import CONFIG from './Config';

import './ImagePicker.scss';


class ImagePicker extends React.Component {

    fileObj = [];
    fileArray = [];

    constructor(props) {
        super(props);
        let initialImages = [];
        if (props.value) {
            props.value.forEach((image, index) => {
                let selected = false;
                if (props.thumbnail && props.thumbnail._id === image._id) {
                    selected = true;
                }
                let imageObj = {
                    _id: image._id,
                    src: CONFIG.API_URL + image.path,
                    uploaded: true,
                    isDefault: selected,
                    saved: true
                };
                initialImages.push(imageObj);
            }, initialImages);
        }
        this.state = {
            file: [null],
            images: initialImages
        };
        console.log(this.state.images);
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
        this.handleDefaultImageChange = this.handleDefaultImageChange.bind(this);
        this.uploadImages = this.uploadImages.bind(this);
        this.handleFormDestruction = this.handleFormDestruction.bind(this);

        document.addEventListener("recipeFormDestroyed", this.handleFormDestruction);
    }

    handleFormDestruction(e) {
        console.log('form is being destroyed...');
    }

    uploadMultipleFiles(e) {
        this.fileObj.push(e.target.files);
        let images = this.state.images;
        for (let i = 0; i < this.fileObj[0].length; i++) {
            images.push({
                _id: undefined,
                name: this.fileObj[0][i].name,
                src: URL.createObjectURL(this.fileObj[0][i]),
                uploaded: false,
                isDefault: false,
                fileObject: this.fileObj[0][i],
                saved: false
            });
        }

        this.setState({
            images: images
        }, () => {
            this.uploadImages();
        });
        this.fileObj = [];
    }

    handleDefaultImageChange(e) {
        let newDefault = e.target.value;
        let images = this.state.images;
        for (let i = 0; i < images.length; i++) {
            if (images[i]._id === newDefault) {
                images[i].isDefault = true;
                continue;
            } else if (images[i].isDefault) {
                images[i].isDefault = false;
            }
        }
        this.setState({
            images: images
        });
        if (this.props.handleChange !== undefined) {
            this.props.handleChange(this.state.images);
        }
    }

    uploadFiles(e) {
        e.preventDefault();
    }

    handleRemoveImage(e, id) {
        e.preventDefault();
        console.log(id);
        fetch(CONFIG.API_URL + 'api/v1/images/' + id, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then((data) => {
                if (data.status === 'success') {
                    let images = this.state.images;
                    images = images.filter(img => img._id !== id);
                    this.setState({
                        images: images
                    }, () => {
                        if (this.props.handleChange !== undefined) {
                            this.props.handleChange(this.state.images);
                        }
                    });
                }
            })
            .catch(console.log);
    }

    uploadImages() {
        let images = this.state.images;
        images.filter(f => !f.uploaded).forEach(function (item, it) {
            let index = images.indexOf(item);

            let formData = new FormData();
            formData.append("image", item.fileObject);

            fetch(CONFIG.API_URL + 'api/v1/images', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then((data) => {
                    if (data.status === 'success') {
                        let images = this.state.images;
                        console.log('updating: ' + index);
                        images[index]._id = data.data._id;
                        images[index].uploaded = true;
                        images[index].src = CONFIG.API_URL + data.data.path;
                        this.setState({
                            images: images
                        }, () => {
                            if (this.props.handleChange !== undefined) {
                                this.props.handleChange(this.state.images);
                            }
    
                        });
                    }
                })
                .catch(console.log);
        }, this);
    }

    render() {

        return (
            <div className="imagepicker">
                <div className="uk-child-width-1-4" data-uk-grid>
                    {(this.state.images || []).map(obj => (
                        <div key={obj._id ? obj._id : obj.name}>
                            <div className="uk-card uk-card-default">
                                <div className="uk-card-body">
                                    <div className="uk-inline uk-width-expand">
                                    <div className="uk-position-center-left">
                                        <input className="uk-radio" type="radio" name="defaultImage[]" disabled={!obj.uploaded} checked={obj.isDefault} value={obj._id} onChange={this.handleDefaultImageChange} /> Thumbnail
                                    </div>
                                    <div className="uk-position-center-right">
                                        <button className="uk-icon-button uk-button-danger" data-uk-icon="trash" onClick={(e) => this.handleRemoveImage(e, obj._id)} />
                                    </div>
                                    </div>
                                </div>
                                <div className="uk-card-media-bottom">
                                        <div className="uk-inline">
                                            <img src={obj.src} />
                                            {!obj.uploaded &&
                                                <div className="uk-overlay uk-position-center" data-uk-spinner="ratio: 3"></div>
                                            }
                                        </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="form-group">
                    <input type="file" multiple onChange={this.uploadMultipleFiles} />
                </div>
            </div>
        );

    }
}

export default ImagePicker;
