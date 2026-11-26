<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    <xsl:param name="lang" select="'en'"/>
            <xsl:param name="imgPrefix" select="'assets/img/'"/>
            <xsl:param name="currentYear" select="2026"/>
    <xsl:template match="/mascotes">
        <xsl:for-each select="mascota">
            <xsl:variable name="speciesCode">
                <xsl:choose>
                    <xsl:when test="contains(foto-mascota, '_cat')">cat</xsl:when>
                    <xsl:otherwise>dog</xsl:otherwise>
                </xsl:choose>
            </xsl:variable>

            <xsl:variable name="birthYear" select="substring(data-naixement, 1, 4)"/>
            <xsl:variable name="age" select="$currentYear - $birthYear"/>
            <xsl:variable name="ageGroup">
                <xsl:choose>
                    <xsl:when test="$age &gt;= 7">senior</xsl:when>
                    <xsl:when test="$age = 0">young</xsl:when>
                    <xsl:otherwise>adult</xsl:otherwise>
                </xsl:choose>
            </xsl:variable>

            <article class="animal-card" id="{@id-mascota}" data-species="{$speciesCode}" data-age="{$ageGroup}">
                <img src="{$imgPrefix}{foto-mascota}" alt="{nom-mascota}" class="animal-image"/>
                <h3><xsl:value-of select="nom-mascota"/></h3>
                <ul>
                    <li>
                        <strong>
                            <xsl:choose>
                                <xsl:when test="$lang = 'ca'">Espècie: </xsl:when>
                                <xsl:when test="$lang = 'es'">Especie: </xsl:when>
                                <xsl:otherwise>Species: </xsl:otherwise>
                            </xsl:choose>
                        </strong>
                        <xsl:choose>
                            <xsl:when test="$speciesCode = 'cat'">
                                <xsl:choose>
                                    <xsl:when test="$lang = 'ca'">Gat</xsl:when>
                                    <xsl:when test="$lang = 'es'">Gato</xsl:when>
                                    <xsl:otherwise>Cat</xsl:otherwise>
                                </xsl:choose>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:choose>
                                    <xsl:when test="$lang = 'ca'">Gos</xsl:when>
                                    <xsl:when test="$lang = 'es'">Perro</xsl:when>
                                    <xsl:otherwise>Dog</xsl:otherwise>
                                </xsl:choose>
                            </xsl:otherwise>
                        </xsl:choose>
                    </li>
                    <li>
                        <strong>
                            <xsl:choose>
                                <xsl:when test="$lang = 'ca'">Sexe: </xsl:when>
                                <xsl:when test="$lang = 'es'">Sexo: </xsl:when>
                                <xsl:otherwise>Sex: </xsl:otherwise>
                            </xsl:choose>
                        </strong>
                        <xsl:choose>
                            <xsl:when test="@sexe = 'mascle'">
                                <xsl:choose>
                                    <xsl:when test="$lang = 'ca'">Mascle</xsl:when>
                                    <xsl:when test="$lang = 'es'">Macho</xsl:when>
                                    <xsl:otherwise>Male</xsl:otherwise>
                                </xsl:choose>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:choose>
                                    <xsl:when test="$lang = 'ca'">Femella</xsl:when>
                                    <xsl:when test="$lang = 'es'">Hembra</xsl:when>
                                    <xsl:otherwise>Female</xsl:otherwise>
                                </xsl:choose>
                            </xsl:otherwise>
                        </xsl:choose>
                    </li>
                    <li>
                        <strong>
                            <xsl:choose>
                                <xsl:when test="$lang = 'ca'">Edat: </xsl:when>
                                <xsl:when test="$lang = 'es'">Edad: </xsl:when>
                                <xsl:otherwise>Age: </xsl:otherwise>
                            </xsl:choose>
                        </strong>
                        <xsl:choose>
                            <xsl:when test="$age = 0">
                                <xsl:choose>
                                    <xsl:when test="$lang = 'ca'">Menys d'1 any</xsl:when>
                                    <xsl:when test="$lang = 'es'">Menos de 1 año</xsl:when>
                                    <xsl:otherwise>Under 1 year</xsl:otherwise>
                                </xsl:choose>
                            </xsl:when>
                            <xsl:when test="$age = 1">
                                <xsl:choose>
                                    <xsl:when test="$lang = 'ca'">1 any</xsl:when>
                                    <xsl:when test="$lang = 'es'">1 año</xsl:when>
                                    <xsl:otherwise>1 year</xsl:otherwise>
                                </xsl:choose>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of select="$age"/>
                                <xsl:choose>
                                    <xsl:when test="$lang = 'ca'"> anys</xsl:when>
                                    <xsl:when test="$lang = 'es'"> años</xsl:when>
                                    <xsl:otherwise> years</xsl:otherwise>
                                </xsl:choose>
                            </xsl:otherwise>
                        </xsl:choose>
                    </li>
                    <li>
                        <strong>
                            <xsl:choose>
                                <xsl:when test="$lang = 'ca'">Pes: </xsl:when>
                                <xsl:when test="$lang = 'es'">Peso: </xsl:when>
                                <xsl:otherwise>Weight: </xsl:otherwise>
                            </xsl:choose>
                        </strong>
                        <xsl:value-of select="pes-mascota"/> kg
                    </li>
                    <li>
                        <strong>
                            <xsl:choose>
                                <xsl:when test="$lang = 'ca'">Color: </xsl:when>
                                <xsl:when test="$lang = 'es'">Color: </xsl:when>
                                <xsl:otherwise>Color: </xsl:otherwise>
                            </xsl:choose>
                        </strong>
                        <xsl:value-of select="color-mascota"/>
                    </li>
                </ul>
                <a href="adoption-questionnaire.html?animal={nom-mascota}" class="cta-button">
                        <xsl:choose>
                            <xsl:when test="$lang = 'ca'">Pregunta per <xsl:value-of select="nom-mascota"/></xsl:when>
                            <xsl:when test="$lang = 'es'">Pregunta por <xsl:value-of select="nom-mascota"/></xsl:when>
                            <xsl:otherwise>Ask about <xsl:value-of select="nom-mascota"/></xsl:otherwise>
                        </xsl:choose>
                    </a>
            </article>

        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>