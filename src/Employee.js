import React from 'react'

export default function Employee() {

  const navigate = useNavigate();

  const navigateToCreateOrder = () => {
    // navigate to /contacts
    navigate('/CreateOrder');
  };
  return (
    <>
        <div>
          <button onClick={navigateToCreateOrder}>Create Order</button>
        </div>

        <Routes>
          <Route path='/CreateOrder' element={<CreateOrder/>} />
        </Routes>
    </>
  )
}
