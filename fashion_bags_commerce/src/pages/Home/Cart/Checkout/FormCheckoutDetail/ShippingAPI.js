import React, { useEffect, useState } from 'react';

function ShipAPI() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [shippingFee, setShippingFee] = useState(0);
  const token = '96b259e7-9ca7-11ee-b394-8ac29577e80e';
  const shopId = '4773374';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
          headers: {
            token: `${token}`,
            'Content-Type': 'application/json; charset=utf-8',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProvinces(data.data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  const handleProvinceChange = async (e) => {
    const selectedProvinceId = e.target.value;
    setSelectedProvince(selectedProvinceId);
    setDistricts([]);
    setWards([]); 
    setShippingFee(0); 

    try {
      const response = await fetch(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${selectedProvinceId}`,
        {
          headers: {
            token: `${token}`,
            'Content-Type': 'application/json; charset=utf-8',
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setDistricts(data.data);
      } else {
        console.error('Failed to fetch districts');
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const handleDistrictChange = async (e) => {
    const selectedDistrictId = e.target.value;
    setSelectedDistrict(selectedDistrictId);

    try {
      const response = await fetch(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${selectedDistrictId}`,
        {
          headers: {
            token: `${token}`,
            'Content-Type': 'application/json; charset=utf-8',
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        setWards(data.data);
      } else {
        console.error('Failed to fetch wards');
      }
    } catch (error) {
      console.error('Error fetching wards:', error);
    }
  };

  const handleWardChange = async (e) => {
    const selectedWardCode = e.target.value;
    setSelectedWard(selectedWardCode);

    try {
      if (selectedDistrict && selectedWardCode) {
        const response = await fetch(
          `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?service_id=53321&insurance_value=1000000&coupon&to_district_id=${selectedDistrict}&from_district_id=1482&weight=500&from_ward_code=11008&to_ward_code=${selectedWardCode}&length=30&width=15&height=40`,
          {
            headers: {
              token: `${token}`,
              'Content-Type': 'application/json; charset=utf-8',
              shop_id: `${shopId}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setShippingFee(data.data.total);
        } else {
          console.error('Failed to fetch shipping fee');
        }
      }
    } catch (error) {
      console.error('Error fetching shipping fee:', error);
    }
  };

  return (
    <div>
      <select onChange={handleProvinceChange}>
        <option value="">Chọn tỉnh/thành phố</option>
        {provinces.map((province) => (
          <option key={province.ProvinceID} value={province.ProvinceID}>
            {province.ProvinceName}
          </option>
        ))}
      </select>

      <select onChange={handleDistrictChange} disabled={!selectedProvince}>
        <option value="">Chọn quận/huyện</option>
        {districts.map((district) => (
          <option key={district.DistrictID} value={district.DistrictID}>
            {district.DistrictName}
          </option>
        ))}
      </select>

      <select onChange={handleWardChange} disabled={!selectedDistrict}>
        <option value="">Chọn phường/xã</option>
        {wards.map((ward) => (
          <option key={ward.WardCode} value={ward.WardCode}>
            {ward.WardName}
          </option>
        ))}
      </select>

      <div>Phí vận chuyển: {shippingFee}</div>
    </div>
  );
}

export default ShipAPI;
