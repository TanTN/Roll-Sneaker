

import React from 'react'
import { contact, otherSneaker, sneaker } from '../data/dataFooter'
import {AiFillFacebook,AiFillYoutube} from 'react-icons/ai'
import {IoMdShareAlt} from 'react-icons/io'
import {CgPin} from 'react-icons/cg'
import {FiPhoneCall} from 'react-icons/fi'
import {CgMail} from 'react-icons/cg'
import {ImFacebook} from 'react-icons/im'
import {BsInstagram,BsTwitter,BsPinterest} from 'react-icons/bs'

const Footer = () => {
  return (
    <div className='bg-black'>
        <div className='grid grid-cols-2 gap-5 px-[20px] py-8 text-slate-200'>
            {sneaker.map((data,index) => 
                <div key={index}>
                    <p className='text-lg font-semibold pb-3'>{data.header}</p>
                    <ul>
                        {data.content.map((data,index) => 

                            <li key={index} className='text-gray-400 pb-1'>{data}</li>

                        )}
                    </ul>
                </div>
            )}
            {otherSneaker.map((data,index) => 
                <div key={index}>
                    <p className='text-lg font-semibold pb-3'>{data.header}</p>
                    <ul>
                        {data.content.map((data,index) => 

                            <li key={index} className='text-gray-400 pb-1'>{data}</li>

                        )}
                    </ul>
                </div>
            )}
            {contact.map((data,index) => 
                <div key={index}>
                    <p className='text-lg font-semibold pb-3'>{data.header}</p>
                    <ul>
                        {data.content.map((data,index) => 

                            <li key={index} className='text-gray-400 pb-1'>{data}</li>

                        )}
                    </ul>
                </div>
            )}
        </div>
        <div className='relative text-white px-[15px]'>
            <div className=''>
                <img width={'100%'} className='h-[180px]' src="https://scontent.fhph1-2.fna.fbcdn.net/v/t39.30808-6/342036108_5956797801108745_5463867297716745361_n.jpg?stp=dst-jpg_s350x350&_nc_cat=110&ccb=1-7&_nc_sid=dd9801&_nc_ohc=_DfxKJEwN0oAX_AFWSN&_nc_ht=scontent.fhph1-2.fna&oh=00_AfB6RfJy6MgESOusmyIX0NVcsTOD9dZlb09bN2pcHdbVtQ&oe=645960E0" alt="img" />
            </div>
            <a className='flex items-center absolute top-[10px] left-[25px]' href="https://www.facebook.com/102066926119211">
                <img width={'54px'} src="https://scontent.fhph1-2.fna.fbcdn.net/v/t39.30808-1/341699436_1419001595594211_9035110618624878235_n.jpg?stp=cp0_dst-jpg_p50x50&_nc_cat=110&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=AP7Ys3uSxXQAX88Viko&_nc_ht=scontent.fhph1-2.fna&oh=00_AfCkTHQ6K1nNylYd4MXX0ekE5SpXwyRX4P_4hO3g2KDqGA&oe=645A68B7" alt="img" />
                <div className='pl-2'>
                    <p className='font-semibold text-lg '>Shop giày Rep Hà Nội</p>
                    <p className='font-medium text-sm text-slate-100'>189 người theo dõi</p>
                </div>
            </a>
            <div className='flex justify-between px-[15px]'>
                <a className='absolute bottom-3 left-6' href="https://www.facebook.com/102066926119211">
                    <div className='flex bg-white text-gray-800 items-center p-[2px] rounded-[2px]'>
                        <AiFillFacebook />
                        <p className='pl-1'>Theo dõi Trang</p>
                    </div>
                </a>
                <a className='absolute bottom-3 right-6' href='https://www.facebook.com/sharer/sharer.php?app_id=776730922422337&u=https%3A%2F%2Fwww.facebook.com%2F102066926119211&display=popup&ref=plugin&src=page'>
                    <div className='flex bg-white text-gray-800 items-center p-[2px] rounded-[2px]'>
                        <IoMdShareAlt />
                        <p className='pl-1'>Chia sẻ</p>
                    </div>
                </a>
            </div>
        </div>
        <div className='mt-2 text-slate-200 px-[15px]'>
            <p className='text-lg font-semibold pb-3'>THÔNG TIN SHOP</p>
            <div className='flex items-start'>
                <div className='flex justify-center w-[20px]'>
                    <CgPin className='text-lg text-gray-400'/>
                </div>
                <p className='pl-1 text-[13px] text-gray-400 pb-1'>Tầng 4 - 161 Chùa Láng - Đống Đa - Hà Nội (Giờ Làm Việc từ 8am - 10pm)</p>
            </div>
            <div className='flex items-start'>
                <div className='flex justify-center w-[20px]'>
                    <FiPhoneCall className='text-gray-400'/>
                </div>
                <p className='pl-1 text-[13px] text-gray-400 pb-1'>0964.033.455</p>
            </div>
            <div className='flex items-start'>
                <div className='flex justify-center w-[20px]'>
                    <FiPhoneCall className='text-gray-400'/>
                </div>
                <p className='pl-1 text-[13px] text-gray-400 pb-1'>08.22222.555</p>
            </div>
            <div className='flex items-start'>
                <div className='flex justify-center w-[20px]'>
                    <CgPin className='text-lg text-gray-400'/>
                </div>
                <p className='pl-1 text-[13px] text-gray-400 pb-1'>150/37 Đặng Văn Ngữ - Phường 14 - Phú Nhuận - HCM (Giờ Làm Việc từ 8am - 10pm)</p>
            </div>
            <div className='flex items-start'>
                <div className='flex justify-center w-[20px]'>
                    <FiPhoneCall className='text-gray-400'/>
                </div>
                <p className='pl-1 text-[13px] text-gray-400 pb-1'>0961.055.755</p>
            </div>
            <div className='flex items-start'>
                <div className='flex justify-center w-[20px]'>
                    <CgMail className='text-xl text-gray-400'/>
                </div>
                <p className='pl-1 text-[13px] text-gray-400 pb-1'>shopgiayreplicahn@gmail.com</p>
            </div>                
        </div>
        <div className='flex py-5 border-b-[1px] border-gray-400 justify-center text-gray-400'>
            <div className='px-2'><ImFacebook /></div>
            <div className='px-2'><BsInstagram /></div>
            <div className='px-2'><BsTwitter /></div>
            <div className='px-2'><AiFillYoutube /></div>
            <div className='px-2'><BsPinterest /></div>
        </div>
        <div className='text-gray-500 text-center text-sm py-3'>
            Copyright © 2018 by Shopgiayreplica.com™ . All Rights Reserved.
        </div>
    </div>
  )
}

export default Footer