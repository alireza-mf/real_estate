import React from 'react';
import { connect } from 'react-redux';
import { uploadImage } from '../actions/auth';
import { useFormik } from "formik";

const ProfileAvatar = (props) => {
    const { onSubmit, setFieldValue} = useFormik({
        initialValues: {image: ""},
        onSubmit(values) {
            props.uploadImage(values)
        }
    })

        return (
                    <form onSubmit={onSubmit} >
                        <div className="auth__form__group">
							<input
								type="file" name="image" 
								onChange={(event) => {
                                    setFieldValue("image", event.currentTarget.files[0])
                                  }} 
								accept="image/png, image/jpg, image/jpeg"
							/>
							<button 
								type="submit" className="auth__form__button"
							>
								Change Profile Picture 
								&nbsp;
								<i/>
							</button>
  					    </div>
                    </form>
        )
}

const mapStateToProps = state => ({
    profileImage: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
    return {
        uploadImage: (userInfo) => dispatch(uploadImage(userInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAvatar);