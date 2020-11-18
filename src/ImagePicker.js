import React from 'react';


class ImagePicker extends React.Component {

    fileObj = [];
    fileArray = [];

    constructor(props) {
        super(props);
        this.state = {
            file: [null]
        };
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
        this.handleDefaultImageChange = this.handleDefaultImageChange.bind(this);
    }

    uploadMultipleFiles(e) {
        this.fileObj.push(e.target.files);
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push({
                name: this.fileObj[0][i].name,
                src: URL.createObjectURL(this.fileObj[0][i]),
                i: i,
                isDefault: false,
                fileObject: this.fileObj[0][i]
            });
        }
        this.setState({
            file: this.fileArray
        });
        if (this.props.handleChange !== undefined) {
            this.props.handleChange(this.fileArray);
        }
    }

    handleDefaultImageChange(e) {
        let newDefault = parseInt(e.target.value);
        for (let i = 0; i < this.fileArray.length; i++) {
            if (this.fileArray[i].i === newDefault) {
                this.fileArray[i].isDefault = true;
                continue;
            } else if (this.fileArray[i].isDefault) {
                this.fileArray[i].isDefault = false;
            }
        }
        this.setState({
            file: this.fileArray
        });
        if (this.props.handleChange !== undefined) {
            this.props.handleChange(this.fileArray);
        }
    }

    uploadFiles(e) {
        e.preventDefault();
    }

    render() {

        return (
            <div>
                <div className="uk-child-width-1-4" data-uk-grid>
                    {(this.fileArray || []).map(obj => (
                        <div key={obj.i}>
                            <div className="uk-card uk-card-default">
                                <div className="uk-card-body"><input type="radio" name="defaultImage[]" value={obj.i} onChange={this.handleDefaultImageChange} /> {obj.name}</div>
                                <div className="uk-card-media-bottom">
                                    <img src={obj.src} />
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
