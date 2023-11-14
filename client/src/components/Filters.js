import { useCallback, useEffect, useState } from "react";
import styles from "../styles/Filters.module.css";
import { useUser } from "../UserContext";
import { useDropzone } from "react-dropzone";
import axios from "axios";
const config = require('../config'); // Adjust the path accordingly

const Filters = ({ onClose }) => {
  
const instance = axios.create({
  baseURL: config.baseURL,
});
  const { loggedInEmail } = useUser();
  const [images, setImages] = useState([]);
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles.map((file) => file.type));
    setImages(acceptedFiles);
    setError("");
    setStatusMessage("");
  
    // Generate image previews
    const previews = acceptedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  }, []);
  

  const { getRootProps, /*getInputProps*/ } = useDropzone({ onDrop,  accept: "image/jpeg, image/png", multiple: true,});

  const handleUpload = async (e) => {
    console.log("In handleUpload function");
    e.preventDefault(); 

    try {
      setLoading(true);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!loggedInEmail.trim() || !emailRegex.test(loggedInEmail.trim())) {setError("Please enter a valid email address."); setStatusMessage("");setLoading(false);return;}
      if (!gender) { setError("Please select a gender."); setStatusMessage("");setLoading(false);return;}
      if (images.length !== 8) {setError("");setStatusMessage("Please select exactly 8 images.");setLoading(false);return;}

      console.log("All validations passed, proceeding to send POST request");

      // All validations passed, proceed to send POST request

      const formData = new FormData();
      formData.append("email", loggedInEmail.trim());
      formData.append("gender", gender);
      console.log("formData email and gender completed");
      console.log("*********************");
      console.log(formData);
      console.log("*********************");

      images.forEach((image, index) => {
        formData.append("images", image);
      });
      console.log("formData Images loading completed");
      console.log("*********************");
      console.log(formData);
      console.log("*********************");

      // Make a POST request to your Node.js server
      await instance.post("/api/CreateLoraRequest/SubmitRequest",  formData   );

      console.log("Images uploaded successfully");
      setStatusMessage("Images uploaded successfully");

      // Clear the form after successful upload
      setGender("");
      setImages([]);
      setError("");
      setImagePreviews([]); 
    } 
    catch (error) 
    {
      if (error.response && error.response.status === 403) {
        // Handle 403 status (Not enough tokens)
        setError("Not enough tokens. Please purchase more tokens to proceed.");
        setStatusMessage("");
      } else {
        // Handle other errors
        setError("Error uploading images. Please try again.");
        setStatusMessage("");
        console.error("Error uploading images:", error);
      }
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll("[data-animate-on-scroll]" );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {threshold: 0.15,}
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {observer.observe(scrollAnimElements[i]); }
    return () => {for (let i = 0; i < scrollAnimElements.length; i++) {observer.unobserve(scrollAnimElements[i]);}}; }, []);

  //const onButtonClick = useCallback(() => { onClose && onClose();  }, [onClose]);
  //const onButton1Click = useCallback(() => { console.log("Upload Image is clicked");onClose && onClose();}, [onClose]); 

  const handleGenderChange = (event) => {setGender(event.target.value); };

  return (
    <div className={styles.filters} data-animate-on-scroll>
      <div className={styles.maininputfilters}>
      <h2 className={styles.drawerheader}>
          <div className={styles.radianceai}>Create Your Own Model</div>
        </h2>
        
        {/* ******************************************************************************** */}
        {/* </div><div {...getRootProps()} className="dropzone"> */}
        <div {...getRootProps()} className={styles.insertimages}>
          <h2 className={styles.heading2}>Upload 10-20 Selfies</h2>
          
          <div className="blank-div" style={{ margin: '30px' }}></div>

            <p className={styles.paragraph}>
              Input data as PNG files cropped to 512 x 512px. Avoid group photos, covered faces, and busy backgrounds.
            </p>
          
        </div>
        
        <div>
        {imagePreviews.map((preview, index) => (
        <img key={index} src={preview} alt={`Preview ${index}`} className={styles.previewImage} />
        ))}
      </div>

        <div className={styles.selmodeltype}>
          
          <select className={styles.buttonsel} style={{textAlign: 'center'}} value={gender} onChange={handleGenderChange}>
            <option value="">Select Model Type</option>
            <option value="men">Male</option>
            <option value="female">Female</option>
            <option value="female">Couple</option>
            <option value="female">Cat</option>
            <option value="female">Dog</option>
            <option value="female">Object</option>
            <option value="female">Perfer Not to Say</option>
          </select>
        </div>

        
        {loading && <p>Loading...</p>}
        {statusMessage && <p className="success-message">{statusMessage}</p>}
        {error && <p className="error-message">{error}</p>}

        {images.length === 8 && gender && (
          <button  button className={styles.buttonsubmit} onClick={handleUpload} disabled={loading}>
            {loading ? "Uploading..." : "Upload Images"}
          </button>
        )}


        {/* <button className={styles.buttonsubmit}>
          <img className={styles.editingSvg} alt="" src="/editing--svg.svg" />
          <div className={styles.heading34}>Generate</div>
        </button> */}

        
      </div>
      {/* ******************************************************************************** */}

      {/* ******************************************************************************** */}
    </div>
  );
};

export default Filters;
