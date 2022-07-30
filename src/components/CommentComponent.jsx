
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


export default function CommentComponent() {
    return (
        <CommentWrapper>
            <header>

                <h3>Name</h3>
                <div style={{ width: "0.5rem" }}></div>

                <div className='avatar'>
                    <svg width="2.2rem" height="2.2rem" viewBox="0 0 72 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M55.3199 66.382L55.3201 66.285C55.3201 53.8012 46.6457 43.6812 35.9454 43.6812C25.245 43.6812 16.5707 53.8012 16.5707 66.285L16.5707 66.312C6.60339 59.91 0 48.7261 0 36C0 16.1177 16.1177 0 36 0C55.8823 0 72 16.1177 72 36C72 48.7727 65.3483 59.9917 55.3199 66.382ZM22.7484 31.3223C23.8232 37.6715 29.349 42.5069 36.0041 42.5069C43.4295 42.5069 49.449 36.4874 49.449 29.062C49.449 21.6366 43.4295 15.6172 36.0041 15.6172C30.8627 15.6172 26.3953 18.5031 24.1335 22.7434C25.1523 22.0953 25.948 23.3626 25.9292 25.6566C25.9098 28.0236 25.0305 30.5872 23.9653 31.3827C23.5002 31.73 23.0765 31.6828 22.7484 31.3223ZM28.1133 27.0044C28.092 29.5983 29.3989 31.4914 31.0322 31.2327C32.6655 30.974 34.0068 28.6615 34.0281 26.0676C34.0494 23.4736 32.7426 21.5806 31.1092 21.8393C29.4759 22.0979 28.1346 24.4105 28.1133 27.0044Z" fill="#D9D9D9" />
                    </svg>

                </div>
            </header>
            <div style={{ height: "0.3rem" }}></div>
            <section>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia dolor, iste tenetur ipsam quos officia harum odio accusamus? Odit aliquid fuga aliquam ab laborum distinctio qui cumque molestiae fugit iusto.
            </section>

        </CommentWrapper>
    )
}

const CommentWrapper = styled.main`
display: flex;
flex-direction: column;
align-items: end;
justify-content: center;
padding:0.2rem 0.6rem;
margin-bottom:0.6rem;
color: rgba(255, 255, 255, 0.9);
  width: 100%;

    header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: end;
        width: 100%;
        height: 1.5rem;
        text-transform: uppercase;
        font-size: 0.8rem;
    }

    section {
        text-align: right;
        font-size: 0.8rem;
        
    }

    .avatar{
        height:1.5rem;
        width:1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
    }

`;
