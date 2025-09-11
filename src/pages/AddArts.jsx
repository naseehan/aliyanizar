import React from 'react'

const AddArts = () => {


const onSubmit = (e) => {
e.preventDefault()

  const formData = {
    name: e.target.name.value,
    email: e.target.category.value,
    phone: e.target.sold.value,
    what: e.target.artImage.value,
    message: e.target.artThumbnail.value,
  };

}

  return (
    <div>
      <form action="" method="post" onSubmit={onSubmit}>
        <label htmlFor="name">Art name*</label>
        <input type="text" name="name" id="name" required/>
        <label htmlFor="category">Art Category*</label>
        <input type="text" name="category" id="category" required/>
        <label htmlFor="name">Sold*</label>
        <select name="sold" id="sold">
            <option value="true">sold</option>
            <option value="not sold">not sold</option>
        </select>
        <label htmlFor="artImage">Art Image*</label>
        <input type="file" name="artImage" id="artImage" required/>
 <label htmlFor="artThumbnail">Art Thumbnail if item is not sold</label>
        <input type="file" name="artThumbnail" id="artThumbnail" />
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default AddArts
